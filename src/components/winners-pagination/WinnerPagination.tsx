import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/useAppDispatch';
import {fetchAllCarsAsync, fetchCarsPageAsync, deleteCarAsync} from '../../features/garage/garageSlice';
import CustomButton from '../../components/button/CustomButton';
import {fetchAllWinnersAsync} from '../../features/winners/winnersSlice';
import {CarPropsType, WinnerTablePropsType} from '../../api/api';

const WinnerPagination = ({winnerTable}: {
    winnerTable: WinnerTablePropsType[]
}) => {

    const dispatch = useAppDispatch();
    const {
        currentPage,
        winners
    } = useAppSelector(state => state.winners)
    const onClickPageChange = async (page: number) => {
        try {
            await dispatch(fetchCarsPageAsync(page));
            console.log('Page changed successfully!');
        } catch (error) {
            console.error('Error changing page:', error);
        }

    };

    useEffect(() => {
        try {
            dispatch(fetchCarsPageAsync(1));
        } catch (error) {
            console.error(error)
        }
    }, [dispatch]);

    return (
        <div>
            <div>
                {winnerTable.map(winner => {
                    return (
                        <tr key={winner.id}>
                            <td>{winner.id}</td>
                            <td>{winner.color}</td>
                            <td>{winner.name}</td>
                            <td>{winner.wins}</td>
                            <td>{winner.time}</td>
                        </tr>
                    )
                })}
            </div>
            <div>
                <CustomButton disabled={currentPage === 1}
                        onClick={() => onClickPageChange(currentPage - 1)}>
                    Previous
                </CustomButton>
                <span>Page {currentPage}</span>
                <CustomButton disabled={currentPage >= Math.ceil(winners.length / 7)}
                        onClick={() => onClickPageChange(currentPage + 1)}>
                    Next
                </CustomButton>
            </div>
        </div>
    );
};

export default WinnerPagination;