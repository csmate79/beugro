export interface ErrorResponse {
    errorCode: ErrorCodes;
}

type ErrorCodes = ('WRONG_AUTH_DATA');