import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AsyncRaceAPI, CarPropsType} from '../../api/api';
import generateName from '../../components/generate/generateName';
import generateColor from '../../components/generate/generateColor';

export const garageSlice = createSlice({
        name: 'garage',
        initialState: {
            cars: [] as CarPropsType[],
            carsPage: [] as CarPropsType[],
            currentPage: 1,
        },
        reducers: {
            createCar: (state, action: PayloadAction<{
                name: string, color: string
            }>) => {
                state.cars.push(action.payload);
            },
            updateCar: (state, action: PayloadAction<{
                id: number | undefined,
                carData: {
                    name: string,
                    color: string
                }
            }>) => {
                const selectedCar = state.carsPage.find(car =>
                    car.id === action.payload.id);
                if (selectedCar) {
                    selectedCar.name = action.payload.carData.name;
                    selectedCar.color = action.payload.carData.color;
                }
            },
            deleteCar: (state, action: PayloadAction<{
                id: number | undefined
            }>) => {
                const carId = action.payload.id;
                state.carsPage = state.carsPage.filter(car => car.id !== carId);
                state.cars = state.cars.filter(car => car.id !== carId);
            },
            fetchCarsPage: (state, action: PayloadAction<{
                cars: CarPropsType[], page: number,
            }>) => {
                state.carsPage = action.payload.cars;
                state.currentPage = action.payload.page;
            },
            fetchAllCars: (state, action: PayloadAction<{
                cars: CarPropsType[],
            }>) => {
                state.cars = action.payload.cars;
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
export const fetchCarsPageAsync = (page: number) => async (dispatch: any) => {
    try {
        const cars: CarPropsType[] = await AsyncRaceAPI.getCarsPage(page);
        dispatch(fetchCarsPage({cars, page}));
    } catch (error) {
        console.error(error);
    }
};
export const fetchAllCarsAsync = () => async (dispatch: any) => {
    try {
        const cars: CarPropsType[] = await AsyncRaceAPI.getCars();
        dispatch(fetchAllCars({cars}));
    } catch (error) {
        console.error(error);
    }
};


export const {
    createCar,
    updateCar,
    deleteCar,
    fetchCarsPage,
    fetchAllCars
} = garageSlice.actions;
export const garageReducer = garageSlice.reducer