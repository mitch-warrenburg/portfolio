export type Validator = (value?: string, required?: boolean) => string;

export type MaskSymbol = 'A' | 'a' | 'x' | '0' | '*';

export interface MaskPatterns {
  A: RegExp;
  a: RegExp;
  x: RegExp;
  '0': RegExp;
  '*': RegExp;
}
