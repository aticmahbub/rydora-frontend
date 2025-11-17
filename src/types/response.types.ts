export interface UserResponseMetaData {
    page: string;
    total: string;
    totalPages: string;
}

export interface Response<T> {
    statusCode: number;
    success: boolean;
    message: string;
    meta?: UserResponseMetaData;
    data: T;
}

export interface Data {
    success: boolean;
    message: string;
    errorSources: IErrorSources[];
    err: IErr;
    stack?: string;
}
// export interface IErrorResponse {
//     success: boolean;
//     message: string;
//     errorSources?: IErrorSources[];
//     err: IErr;
//     stack?: string;
// }

export interface IGenericErrorResponse {
    statusCode: number;
    message: string;
    errorSources?: IErrorSources[];
}

export interface IErrorResponse {
    status: number;
    data: Data;
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
