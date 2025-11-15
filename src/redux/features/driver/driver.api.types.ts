import type {TVehicleRegistrationForm} from '@/components/modules/user/registration/driverRegistrationFormSchema';

export interface IDriverRegistrationRequest {
    drivingLicenseNo: string;
    vehicle: {
        registrationNo: string;
        vehicleType: TVehicleRegistrationForm;
        brand: string;
        model: string;
        color: string;
        capacity: number;
        // registrationCard: string;
    };
}
