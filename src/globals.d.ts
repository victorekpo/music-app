declare module express {}

declare module 'papaparse/papaparse' {
  import { Parser, ParseConfig, ParseResult, UnparseConfig, UnparseObject } from 'papaparse';

  export function parse(input: string | File, config?: ParseConfig): ParseResult;
  export function unparse(data: Array<any> | UnparseObject, config?: UnparseConfig): string;
  export { Parser };
}