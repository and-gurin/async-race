import React from 'react';
import {createSelector} from '@reduxjs/toolkit';
import {RootStateType, store} from '../../store/store';
import {useAppSelector} from '../../hooks/useAppDispatch';

const Winners = () => {

    const selectCars = (state: RootStateType) => state.garage.cars;
    const state = store.getState()
    const selectCar = (state: RootStateType, carId: number) => {
        return state.garage.cars.find(car => car.id === carId);
    };
    const selectWinners = (state: RootStateType) => state.winners.winners;

    const selectWinnerTable = createSelector(
        selectWinners,
        selectCars,
        (winners, cars) => {
            return winners.map(winner => ({
                ...winner,
                name: selectCar(state, winner.id!)?.name || '',
                color: selectCar(state, winner.id!)?.color || ''
            }));
        }
    );
    const winnerTable = useAppSelector((state: RootStateType) => selectWinnerTable(state));
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <td>№</td>
                    <td>Car</td>
                    <td>Name</td>
                    <td>Wins</td>
                    <td>Best time</td>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    );
};

export default Winners;