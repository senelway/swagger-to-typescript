import { IAllApi } from './types';

import { getDescription, checkType } from './utilts';

export interface IEnumObject {
  enum: string[];
  type: string;
  description: string;
}
export interface IPropertyValue {
  type: string;
  $ref: string;
  description: string;
  nullable: boolean;
}
export interface IProperty extends  IPropertyValue{
  // @ts-ignore
  [keyName: string]: IPropertyValue;
}

export interface IInterfaceObject {
  type: string;
  properties: {
    [name: string]: IProperty
  };
}

export default ({ regexpMethods, modificators }: IAllApi) => {
  const arrayToString = (arr: string[]) => arr.join('\n').replace(regexpMethods.replaceSpace, "");

  const generateEnum = (name: string, value: IEnumObject) => `export enum ${name} {
  ${value.enum.map(q => `${q} = "${q}", ${getDescription(value)}`).join('\n  ')}
}`;

  const generateInterface = (name: string, value: IInterfaceObject) => {
    const fields: string[] = [];
    const generatedProp: string[] = [];
    const replaceVal = (val: string) => val.replace(/^\#\/components\/schemas\//gm, '');
    const checkOtherProp = (property: IProperty) => {
      let returnedProp = checkType(modificators, property.type);

      for (const keyProp of Object.keys(property)) {
        if (property[keyProp] instanceof Object) {
          const value = property[keyProp];
          if (value.hasOwnProperty('$ref')) {
            returnedProp = replaceVal(value.$ref);
          } else if (value.hasOwnProperty('type')) {
            returnedProp = checkType(modificators, value.type);
          }
        }
      }
      return returnedProp;
    }
    for (const keyProps of Object.keys(value.properties)) {
      const property = value.properties[keyProps];
      const type = () => {
        if (property.$ref) {
          return replaceVal(property.$ref);
        }
        if (property.type === 'array') {
          return checkOtherProp(property) + '[]';
        }
        if (property.type === 'object') {
          return checkOtherProp(property);
        }
        return checkType(modificators, property.type);
      }
      generatedProp.push(`${keyProps}: ${type()}; ${getDescription(property)}`);
    }
    fields.push(`export interface ${name} {
  ${generatedProp.join('\n ')}
}`)
    return arrayToString(fields);
  };

  return (parsedData: any) => {
    const { components: { schemas } } = parsedData;
    const enums: string[] = [];
    const interfaces: string[] = [];
    for (const key of Object.keys(schemas)) {
      if (key.startsWith('Enum') || schemas[key].hasOwnProperty('enum')) {
        enums.push(generateEnum(key, schemas[key]));
      } else if (!regexpMethods.excludeDTO.test(key)) {
        interfaces.push(generateInterface(key, schemas[key]));
      }
    }
    return arrayToString([...enums, ...interfaces]);
  }
}