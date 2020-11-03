import { IModificators } from './types';
export declare const capitalize: (text: string) => string;
export declare const whitEnumPusher: (property: string) => string;
export declare const checkType: (modificators: IModificators, type: string) => string;
export declare const getDescription: ({ description }: {
    description: string;
}) => string;
