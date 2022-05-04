export type ValidationErrors = {
  [key: string]: any
}
export interface ValidatorFunction {
  (value: any): ValidationErrors | null
}
