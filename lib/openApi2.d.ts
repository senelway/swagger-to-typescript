import { IAllApi } from './types';
export interface IProps {
    description: string;
    type: string;
    items: any;
    enum: string[];
}
declare const _default: ({ regexpMethods, modificators }: IAllApi) => (parsedData: any) => string;
export default _default;
