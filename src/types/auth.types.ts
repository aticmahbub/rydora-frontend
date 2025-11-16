export interface CurrentLocation {
    type: string;
    coordinates: number[];
    updatedAt: string;
}

export interface IAuth {
    provider: string;
    providerId: string;
}

export interface LoginResponseData {
    accessToken: string;
    refreshToken: string;
    user: UserData;
}

export interface UserData {
    currentLocation: CurrentLocation;
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
