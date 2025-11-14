import type {IGeoPoint, ICoordinates} from '@/types/location.types';
import {coordinatesToGeoPoint, isCoordinates} from '@/utils/locationConverter';
import {getAddressFromCoordinates} from '@/utils/reverseGeocoding';
import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from '@reduxjs/toolkit';

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

// Thunk to set location with geocoding
const setLocationWithGeocoding = createAsyncThunk(
    'location/setWithGeocoding',
    async (
        {
            coordinates,
            type,
        }: {coordinates: ICoordinates; type: 'pickup' | 'dropoff'},
        {dispatch},
    ) => {
        // Get address from coordinates
        const address = await getAddressFromCoordinates(coordinates);

        // Create geo point with address
        const geoPoint = coordinatesToGeoPoint(coordinates, address);

        // Dispatch appropriate action based on type
        if (type === 'pickup') {
            dispatch(setPickupLocation(geoPoint));
        } else {
            dispatch(setDropoffLocation(geoPoint));
        }

        return {geoPoint, address};
    },
);

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setPickupLocation: (state, action: PayloadAction<IGeoPoint>) => {
            state.pickupLocation = isCoordinates(action.payload)
                ? coordinatesToGeoPoint(action.payload)
                : action.payload;
        },
        setDropoffLocation: (state, action: PayloadAction<IGeoPoint>) => {
            state.dropoffLocation = isCoordinates(action.payload)
                ? coordinatesToGeoPoint(action.payload)
                : action.payload;
        },
        setDriverLocation: (state, action: PayloadAction<IGeoPoint>) => {
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

export {setLocationWithGeocoding};
export default locationSlice.reducer;
