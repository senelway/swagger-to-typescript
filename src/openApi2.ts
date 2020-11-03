import { whitEnumPusher, checkType, capitalize, getDescription } from './utilts';

import { IAllApi } from './types';

export interface IProps {
  description: string;
  type: string;
  items: any;
  enum: string[];
}

export default ({ regexpMethods, modificators }: IAllApi) => {
  const checkNameInterface = (name: string) => {
    if (regexpMethods.nameInterface.test(name)) {
      const vl = name.match(regexpMethods.nameInterface);
      return vl ? vl[1] : vl;
    }

    return name.split('[')[0];
  };

  const generateSchema = (definition: string, returnValue: string) => {
    if (regexpMethods.excludeDTO.test(definition) || !returnValue) {
      return;
    }

    return `export interface ${checkNameInterface(definition)} {${returnValue}}`;
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
      return returner(`${checkType(modificators, props.items.type)}[]`);
    }

    if ('$ref' in props) {
      // @ts-ignore
      const interfaceName = props['$ref'].match(regexpMethods.matchInterfaceName);
      return returner(interfaceName ? interfaceName[1] : interfaceName);
    }

    return returner(checkType(modificators, props.type));
  };


  return (parsedData: any) => {
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
      return generateSchema(definition, types);
    });
    return [...enums, ...interfaces].join('\n').replace(regexpMethods.replaceSpace, "");
  }
}
