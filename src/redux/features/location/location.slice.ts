import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

export interface Coordinates {
    lat: number;
    lng: number;
}

interface LocationState {
    pickupLocation: Coordinates | null;
    dropoffLocation: Coordinates | null;
    driverLocation: Coordinates | null;
}

const initialState: LocationState = {
    pickupLocation: null,
    dropoffLocation: null,
    driverLocation: null,
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setPickupLocation: (state, action: PayloadAction<Coordinates>) => {
            state.pickupLocation = action.payload;
        },
        setDropoffLocation: (state, action: PayloadAction<Coordinates>) => {
            state.dropoffLocation = action.payload;
        },
        setDriverLocation: (state, action: PayloadAction<Coordinates>) => {
            state.driverLocation = action.payload;
        },
        resetLocations: (state) => {
            state.pickupLocation = null;
            state.dropoffLocation = null;
            state.driverLocation = null;
        },
    },
});

export const {
    setPickupLocation,
    setDropoffLocation,
    setDriverLocation,
    resetLocations,
} = locationSlice.actions;

export default locationSlice.reducer;
