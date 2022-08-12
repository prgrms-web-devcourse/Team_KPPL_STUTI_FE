export interface errorsType {
  field: string;
  value: string;
  cause: string;
}

export interface errorType {
  errorCode: string;
  message: string;
  errors: errorsType[];
}
