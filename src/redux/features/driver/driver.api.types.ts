export interface IDriverRegistrationRequest {
    drivingLicenseNo: string;
    vehicle: {
        registrationNo: string;
        vehicleType: string;
        brand: string;
        model: string;
        color: string;
        manufacturingYear: number;
        capacity: number;
        registrationCard: string;
        insurance: {
            provider: string;
            policyNo: string;
            expiryDate: string;
            document: string;
        };
    };
}
