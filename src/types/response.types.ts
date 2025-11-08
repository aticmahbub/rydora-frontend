export interface IResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
}

export interface IErrorResponse {
    success: boolean;
    message: string;
    errorSources?: IErrorSources[];
    err: IErr;
    stack?: string;
}

export interface IErrorSources {
    path: string;
    message: string;
}
export interface IErr {
    statusCode?: number;
    message?: string;
    name?: string;
    expiredAt?: Date;
}

export interface IGenericErrorResponse {
    statusCode: number;
    message: string;
    errorSources?: IErrorSources[];
}
