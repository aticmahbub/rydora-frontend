import type {IRide} from '@/types';
import type {IGeoPoint} from '@/types/location.types';
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

interface RideState {
    currentRide: Partial<IRide> | null;
}

const initialState: RideState = {
    currentRide: null,
};

const rideSlice = createSlice({
    name: 'ride',
    initialState,
    reducers: {
        setPickupLocation(state, action: PayloadAction<IGeoPoint>) {
            if (!state.currentRide) state.currentRide = {};
            state.currentRide.pickupLocation = action.payload;
        },
        setDropoffLocation(state, action: PayloadAction<IGeoPoint>) {
            if (!state.currentRide) state.currentRide = {};
            state.currentRide.dropoffLocation = action.payload;
        },
        setRideStatus(state, action: PayloadAction<IRide['rideStatus']>) {
            if (!state.currentRide) state.currentRide = {};
            state.currentRide.rideStatus = action.payload;
        },
        resetRide(state) {
            state.currentRide = null;
        },
    },
});

export const {setPickupLocation, setDropoffLocation, setRideStatus, resetRide} =
    rideSlice.actions;

export default rideSlice.reducer;
