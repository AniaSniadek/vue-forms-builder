export type ValidationErrors = {
  [key: string]: any;
};
export type ValidatorFunction = (value: any) => ValidationErrors | null;
