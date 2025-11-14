import type {ICoordinates} from '@/types';
import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from '@reduxjs/toolkit';

interface GeocodingState {
    address: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: GeocodingState = {
    address: null,
    loading: false,
    error: null,
};

export const reverseGeocode = createAsyncThunk(
    'geocoding/reverseGeocode',
    async (coordinates: ICoordinates): Promise<string> => {
        const {lat, lng} = coordinates;

        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
        );

        if (!response.ok) {
            throw new Error('Geocoding failed');
        }

        const data = await response.json();
        return data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    },
);

const geocodingSlice = createSlice({
    name: 'geocoding',
    initialState,
    reducers: {
        clearAddress: (state) => {
            state.address = null;
            state.error = null;
        },
        setAddress: (state, action: PayloadAction<string>) => {
            state.address = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(reverseGeocode.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(reverseGeocode.fulfilled, (state, action) => {
                state.loading = false;
                state.address = action.payload;
            })
            .addCase(reverseGeocode.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Geocoding failed';
            });
    },
});

export const {clearAddress, setAddress} = geocodingSlice.actions;
export default geocodingSlice.reducer;
