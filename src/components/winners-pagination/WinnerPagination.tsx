import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/useAppDispatch';
import CustomButton from '../../components/button/CustomButton';
import {fetchWinnersPageAsync} from '../../features/winners/winnersSlice';

const WinnerPagination = () => {

    const dispatch = useAppDispatch();
    const {
        currentPage,
        winners
    } = useAppSelector(state => state.winners)
    const onClickPageChange = async (page: number) => {
        try {
            await dispatch(fetchWinnersPageAsync(page));
            console.log('Page changed successfully!');
        } catch (error) {
            console.error('Error changing page:', error);
        }

    };

    useEffect(() => {
        try {
            dispatch(fetchWinnersPageAsync(1));
        } catch (error) {
            console.error(error)
        }
    }, [dispatch]);

    return (
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
    );
};

export default WinnerPagination;