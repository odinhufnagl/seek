import { ApiErrorType } from '../types';

export class ApiError extends Error {
  status: number;
  errorCode: ApiErrorType;
  constructor(status: number, errorCode: ApiErrorType, message: string) {
    super(message);
    this.name = 'ApiError';
    this.errorCode = errorCode;
    this.status = status;
  }
}

export class AppError extends Error {
  constructor(message?: string) {
    super(message);
  }
  static fromApiError(e: ApiError) {
    switch (e.errorCode) {
      case 'E203':
        return new EmailInUseError();
      case 'E101':
        return new WrongEmailPasswordError();
      default:
        return new AppError('Something went wrong');
    }
  }
}
export class EmailInUseError extends AppError {
  constructor() {
    super('Email already in use');
  }
}
export class WrongEmailPasswordError extends AppError {
  constructor() {
    super('Wrong email or password');
  }
}
export class NetworkError extends AppError {
  constructor() {
    super('Network error');
  }
}
