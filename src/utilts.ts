import { IModificators } from './types';

export const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export const whitEnumPusher = (property: string) => `${property}: Enum${capitalize(property)};`;

export const checkType = (modificators: IModificators, type: string) => modificators.typeReplace[type] || type;

export const getDescription = ({ description }: { description: string }) => description ? `// ${description}` : '// NO DESCRIPTION';