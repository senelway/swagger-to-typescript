import { IncomingMessage } from 'http';
import ErrnoException = NodeJS.ErrnoException;

const fs = require('fs');
const gitDiff = require('git-diff');
const http = require('http');

export interface ISwatts {
  API: string;
  regexpMethods: {
    nameInterface: RegExp,
    matchInterfaceName: RegExp,
    excludeDTO: RegExp,
    replaceSpace: RegExp,
  },
  modificators: {
    interfaceReplace: { [value: string]: string },
    typeReplace: { [value: string]: string }
  },
  filePath: string;
}

export interface IProps {
  description: string;
  type: string;
  items: any;
  enum: string[];
}

export default (
  { API, regexpMethods, modificators, filePath }: ISwatts
) => {
  const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

  const onError = (e: Error) => e && console.log(e);

  const getDescription = ({ description }: IProps) => description ? `// ${description}` : '// NO DESCRIPTION';

  const checkType = (type: string) => modificators.typeReplace[type] || type;

  const checNameInterface = (name: string) => {
    if (regexpMethods.nameInterface.test(name) && regexpMethods.nameInterface) {
      const vl = name.match(regexpMethods.nameInterface);
      return vl ? vl[1] : vl;
    }

    return name.split('[')[0];
  };

  const generateShema = (definition: string, returnValue: string) => {
    if (regexpMethods.excludeDTO.test(definition) || !returnValue) {
      return;
    }

    return `export interface ${checNameInterface(definition)} {${returnValue}}`;
  };

  const enumPusher = (property: string, props: IProps) => (
    `export enum Enum${capitalize(property)} {
  ${props.enum.map(e => `${e} = '${e}', ${getDescription(props)}`).join('\n  ')},
}`
  );

  const defaultPusher = (property: string, props: IProps) => {
    const returner = (value: string) => `
  ${property}: ${modificators.interfaceReplace[value] || value}; ${getDescription(props)}
`;

    if (props.type === 'array') {
      if (props.items['$ref']) {
        const interfaceName = `${props.items['$ref'].match(regexpMethods.matchInterfaceName)[1]}[]`;
        return returner(interfaceName);
      }
      return returner(`${checkType(props.items.type)}[]`);
    }

    if ('$ref' in props) {
      // @ts-ignore
      const interfaceName = props['$ref'].match(regexpMethods.matchInterfaceName);
      return returner(interfaceName ? interfaceName[1] : interfaceName);
    }

    return returner(checkType(props.type));
  };

  const whitEnumPusher = (property: string) => `
  ${property}: Enum${capitalize(property)};
`;

  http.get(API, (res: IncomingMessage) => {
    const { statusCode } = res;

    if (statusCode === 200) {
      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk: string) => { rawData += chunk; });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          const { definitions } = parsedData;
          const enums: string[] = [];
          const enumKeys: string[] = [];

          const interfaces = Object.keys(definitions).map(definition => {
            const { properties } = definitions[definition];
            const types = Object.keys(properties).map(e => {
              const { pagination, ...prop } = properties[e];
              if ('enum' in prop) {
                if (!enumKeys.includes(e)) {
                  enums.push(enumPusher(e, prop));
                }
                enumKeys.push(e);
                return whitEnumPusher(e);
              }
              return defaultPusher(e, prop);
            }).join('');
            return generateShema(definition, types);
          });
          const toFile = [...enums, ...interfaces].join('\n').replace(regexpMethods.replaceSpace, "");

          if (toFile) {
            fs.readFile(filePath, 'utf8', (err: ErrnoException, data: string) => {
              if (data) {
                console.log(
                  gitDiff(data, toFile, { color: true, wordDiff: true, noHeaders: true })
                  ||
                  'no changes'
                );
              }
              fs.writeFile(filePath, toFile, onError);
            })
          }
        } catch (e) {
          console.error(e.message);
        }
      });
    }
  });
}
