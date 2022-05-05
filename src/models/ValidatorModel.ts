export type ValidationError = {
  [key: string]: any;
};
export type ValidatorFunction = (value: any) => ValidationError | null;
