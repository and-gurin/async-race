import React, {useState} from 'react';
import {createSelector} from '@reduxjs/toolkit';
import {RootStateType, store} from '../../store/store';
import {useAppDispatch, useAppSelector} from '../../hooks/useAppDispatch';
import WinnerPagination from '../../components/winners-pagination/WinnerPagination';
import CarIcon from '../../components/icons/Car-icon';
import style from './Winners.module.css'
import CustomSort from '../../components/custom-sort/CustomSort';
import {fetchWinnersPageAsync} from '../../features/winners/winnersSlice';

const Winners = () => {
    const [orderWins, setOrderWins] = useState('');
    const [orderTime, setOrderTime] = useState('');
    const dispatch = useAppDispatch();
    const {
        winners,
        currentPage
    } = useAppSelector(state => state.winners);
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
    const onChangeSortWins = async (newOrder: string) => {
      setOrderWins(newOrder);
        try {
            await dispatch(fetchWinnersPageAsync(currentPage, 'wins', orderWins));
            console.log('Page changed successfully!');
        } catch (error) {
            console.error('Error changing page:', error);
        }
    }
    const onChangeSortTime = async (newOrder: string) => {
        setOrderTime(newOrder);
        try {
            await dispatch(fetchWinnersPageAsync(currentPage, 'time', orderTime));
            console.log('Page changed successfully!');
        } catch (error) {
            console.error('Error changing page:', error);
        }
    }
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
                        <th onClick={() => onChangeSortWins}>
                            Wins
                            <CustomSort order={orderWins} onChange={onChangeSortWins}/>
                        </th>
                        <th onClick={() => onChangeSortTime}>
                            Best time
                            <CustomSort order={orderTime} onChange={onChangeSortTime}/>
                        </th>
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