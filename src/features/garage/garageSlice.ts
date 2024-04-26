import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AsyncRaceAPI, CarPropsType} from 'src/api/api';

const initialState: CarPropsType[] = await AsyncRaceAPI.getCars();

export const garageSlice = createSlice({
        name: 'garage',
        initialState,
        reducers: {
            createCar: (state, action: PayloadAction<{ name: string, color: string}>) => {
                state.push(action.payload);
            },
            updateCar: (state, action: PayloadAction<{ name: string, color: string, id: number}>) => {
            },
        }
    }
)

export const createCarAsync = (carData: { name: string; color: string }) => async (dispatch: any) => {
    try {
        const newCar = await AsyncRaceAPI.postCar(carData);
        dispatch(createCar(carData));
    } catch (error) {
        console.error(error);
    }
};

export const {createCar} = garageSlice.actions;
export const garageReducer = garageSlice.reducer