export interface IRegexpMethods {
  nameInterface: RegExp,
  matchInterfaceName: RegExp,
  excludeDTO: RegExp,
  replaceSpace: RegExp,
}

export interface IModificators {
  interfaceReplace: { [value: string]: string },
  typeReplace: { [value: string]: string }
}

export interface IAllApi {
  regexpMethods: IRegexpMethods,
  modificators: IModificators,
}

export interface ISwatts extends IAllApi {
  API: string;
  filePath: string;
}