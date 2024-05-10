import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/useAppDispatch';
import CustomButton from '../../components/button/CustomButton';
import {fetchWinnersPageAsync} from '../../features/winners/winnersSlice';
import {restoreState, saveState} from '../../components/local-storage/localStorage';

const WinnerPagination = () => {

    const dispatch = useAppDispatch();
    const {
        currentPage,
        winners
    } = useAppSelector(state => state.winners)
    const onClickPageChange = async (page: number) => {
        try {
            await dispatch(fetchWinnersPageAsync(page));
            saveState('currentWinnersPage', page)
            console.log('Page changed successfully!');
        } catch (error) {
            console.error('Error changing page:', error);
        }

    };

    useEffect(() => {
        try {
            const savedPage = restoreState('currentWinnersPage', 1)
            dispatch(fetchWinnersPageAsync(savedPage));
        } catch (error) {
            console.error(error)
        }
    }, [dispatch]);

    return (
        <div>
            <CustomButton
                disabled={currentPage === 1}
                xType={'default'}
                onClick={() => onClickPageChange(currentPage - 1)}
            >
                Previous
            </CustomButton>
            <span>Page {currentPage}</span>
            <CustomButton
                disabled={currentPage >= Math.ceil(winners.length / 7)}
                xType={'default'}
                onClick={() => onClickPageChange(currentPage + 1)}
            >
                Next
            </CustomButton>
        </div>
    );
};

export default WinnerPagination;