import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach(error => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
