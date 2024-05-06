import {Action, combineReducers, configureStore, ThunkDispatch} from '@reduxjs/toolkit';
import {garageReducer} from '../features/garage/garageSlice';
import {winnersReducer} from "../features/winners/winnersSlice";

const rootReducer = combineReducers({
    garage: garageReducer,
    winners: winnersReducer,
});

export const store = configureStore({
    reducer: rootReducer
})

export type RootStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootStateType, unknown, Action>;

// @ts-ignore
window.store = store;