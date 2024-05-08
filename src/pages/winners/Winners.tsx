import React from 'react';
import {createSelector} from '@reduxjs/toolkit';
import {RootStateType, store} from '../../store/store';
import {useAppSelector} from '../../hooks/useAppDispatch';
import WinnerPagination from '../../components/winners-pagination/WinnerPagination';
import CarIcon from '../../components/icons/Car-icon';
import style from './Winners.module.css'

const Winners = () => {

    const {
        winners
    } = useAppSelector(state => state.winners)
    const selectCars = (state: RootStateType) => state.garage.cars;
    const state = store.getState()
    const selectCar = (state: RootStateType, carId: number) => {
        return state.garage.cars.find(car => car.id === carId);
    };
    const selectWinners = (state: RootStateType) => state.winners.winnersPage;
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
        <section className={style.winners}>
            <div className={style.winners__wrapper}>
                <h1 className={style.winners__title}>Winners</h1>
                <table className={style.winners__table}>
                    <thead>
                    <tr>
                        <th >№</th>
                        <th>Car</th>
                        <th>Name</th>
                        <th>Wins</th>
                        <th>Best time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {winnerTable.map(winner => {
                        return (
                            <tr key={winner.id}>
                                <td>{winner.id}</td>
                                <td><CarIcon color={winner.color}/></td>
                                <td>{winner.name}</td>
                                <td>{winner.wins}</td>
                                <td>{winner.time}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <WinnerPagination/>
            </div>
        </section>
    );
};

export default Winners;