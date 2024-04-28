import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AsyncRaceAPI, CarPropsType} from '../../api/api';
import generateName from "../../components/generate/generateName";
import generateColor from "../../components/generate/generateColor";

const initialState: CarPropsType[] = await AsyncRaceAPI.getCars();

export const garageSlice = createSlice({
        name: 'garage',
        initialState,
        reducers: {
            createCar: (state, action: PayloadAction<{
                name: string, color: string
            }>) => {
                state.push(action.payload);
            },
            updateCar: (state, action: PayloadAction<{
                id: number | undefined,
                carData: {
                    name: string,
                    color: string
                }
            }>) => {
                const selectedCar = state.find(car =>
                    car.id === action.payload.id);
                if (selectedCar) {
                    selectedCar.name = action.payload.carData.name;
                    selectedCar.color = action.payload.carData.color;
                }
            },
            deleteCar: (state, action: PayloadAction<{
                id: number | undefined,
            }>) => {
                const selectedCar = state.find(car =>
                    car.id === action.payload.id);
                if (selectedCar) {
                    state.unshift(selectedCar)
                }
            },
        }
    }
)

export const createCarAsync = (carData: { name: string; color: string }) => async (dispatch: any) => {
    try {
        await AsyncRaceAPI.postCar(carData);
        dispatch(createCar(carData));
    } catch (error) {
        console.error(error);
    }
};
export const updateCarAsync = (id: number | undefined, carData: { name: string; color: string }) => async (dispatch: any) => {
    try {
        await AsyncRaceAPI.updateCar(id, carData);
        dispatch(updateCar({id, carData}))
    } catch (error) {
        console.error(error);
    }
};
export const generateCarsAsync = () => async (dispatch: any) => {
    try {
        for (let i = 0; i <= 100; i ++) {
            const carData = {
                name: generateName(),
                color: generateColor()
            }
            await AsyncRaceAPI.postCar(carData);
            dispatch(createCar(carData));
        }
    } catch (error) {
        console.error(error);
    }
};
export const deleteCarAsync = (id: number | undefined) => async (dispatch: any) => {
    try {
        await AsyncRaceAPI.removeCar(id);
        dispatch(deleteCar({id}))
    } catch (error) {
        console.error(error);
    }
};

export const {createCar, updateCar, deleteCar} = garageSlice.actions;
export const garageReducer = garageSlice.reducer