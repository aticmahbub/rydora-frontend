export interface ILoginFormData {
    email: string;
    password: string;
}
export interface IRegisterFormData {
    name: string;
    email: string;
    NID: number;
    password: string;
}

export interface ILoginData {
    accessToken: string;
    refreshToken: string;
    user: IUserData;
}
export interface ICurrentLocation {
    type: string;
    coordinates: number[];
    updatedAt: string;
}

export interface IAuth {
    provider: string;
    providerId: string;
}

export interface IUserData {
    currentLocation: ICurrentLocation;
    _id: string;
    name: string;
    email: string;
    role: string;
    NID: number;
    isDeleted: boolean;
    isActive: string;
    isVerified: boolean;
    auths: IAuth[];
    createdAt: string;
    updatedAt: string;
}
