export interface ISwatts {
    API: string;
    regexpMethods: {
        nameInterface: RegExp;
        matchInterfaceName: RegExp;
        excludeDTO: RegExp;
        replaceSpace: RegExp;
    };
    modificators: {
        interfaceReplace: {
            [value: string]: string;
        };
        typeReplace: {
            [value: string]: string;
        };
    };
    filePath: string;
}
export interface IProps {
    description: string;
    type: string;
    items: any;
    enum: string[];
}
declare const _default: ({ API, regexpMethods, modificators, filePath }: ISwatts) => void;
export default _default;
