import type {IGeoPoint, Coordinates} from '@/types/location.types';
import {coordinatesToGeoPoint, isCoordinates} from '@/utils/locationConverter';
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

interface LocationState {
    currentRide: IGeoPoint | null;
    pickupLocation: IGeoPoint | null;
    dropoffLocation: IGeoPoint | null;
    driverLocation: IGeoPoint | null;
    selectedLocation: 'pickup' | 'dropoff' | null;
}

const initialState: LocationState = {
    currentRide: null,
    pickupLocation: null,
    dropoffLocation: null,
    driverLocation: null,
    selectedLocation: null,
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setPickupLocation: (
            state,
            action: PayloadAction<IGeoPoint | Coordinates>,
        ) => {
            state.pickupLocation = isCoordinates(action.payload)
                ? coordinatesToGeoPoint(action.payload)
                : action.payload;
        },
        setDropoffLocation: (
            state,
            action: PayloadAction<IGeoPoint | Coordinates>,
        ) => {
            state.dropoffLocation = isCoordinates(action.payload)
                ? coordinatesToGeoPoint(action.payload)
                : action.payload;
        },
        setDriverLocation: (
            state,
            action: PayloadAction<IGeoPoint | Coordinates>,
        ) => {
            state.driverLocation = isCoordinates(action.payload)
                ? coordinatesToGeoPoint(action.payload)
                : action.payload;
        },
        selectLocation: (
            state,
            action: PayloadAction<'pickup' | 'dropoff' | null>,
        ) => {
            state.selectedLocation = action.payload;
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
    selectLocation,
    resetLocations,
} = locationSlice.actions;

export default locationSlice.reducer;
