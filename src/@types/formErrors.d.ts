export interface FormError {
  id: string;
  isInvalid: boolean;
  errorText?: string;
}

export interface FormErrors {
  [key: string]: FormError;
}
