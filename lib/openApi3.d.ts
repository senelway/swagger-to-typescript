import { IAllApi } from './types';
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
export interface IProperty extends IPropertyValue {
    [keyName: string]: IPropertyValue;
}
export interface IInterfaceObject {
    type: string;
    properties: {
        [name: string]: IProperty;
    };
}
declare const _default: ({ regexpMethods, modificators }: IAllApi) => (parsedData: any) => string;
export default _default;
