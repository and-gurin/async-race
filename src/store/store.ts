import {Action, combineReducers, configureStore, ThunkDispatch} from '@reduxjs/toolkit';
import {garageReducer} from 'src/features/garage/garageSlice';

const rootReducer = combineReducers({
    garage: garageReducer,
});

export const store = configureStore({
    reducer: rootReducer
})

export type RootStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootStateType, unknown, Action>;

// @ts-ignore
window.store = store;