import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/useAppDispatch';
import {fetchAllCarsAsync, fetchCarsPageAsync, deleteCarAsync} from '../../features/garage/garageSlice';
import CarItem from '../../components/car-item/Car-item';
import CustomButton from '../../components/button/CustomButton';
import {checkCurrentBestTime, clearCurrentRaceParticipants} from '../../features/winners/winnersSlice';

const GaragePagination = ({setSelectedCarId, setUpdateName, setUpdateColor, setIsOpen}: {
    setSelectedCarId: (id: number | undefined) => void,
    setUpdateName: (name: string) => void,
    setUpdateColor: (color: string) => void,
    setIsOpen: (isOpen: boolean) => void,
}) => {
    const [startedStoppedStatus, setStartedStoppedStatus]
        = useState<'' | 'started' | 'stopped'>('');
    const dispatch = useAppDispatch();
    const {
        carsPage,
        currentPage,
        cars
    } = useAppSelector(state => state.garage);
    const {
        currentWorstTime
    } = useAppSelector(state => state.winners);

    const onClickPageChange = async (page: number) => {
        try {
            await dispatch(fetchCarsPageAsync(page));
            console.log('Page changed successfully!');
        } catch (error) {
            console.error('Error changing page:', error);
        }

    };
    const onClickRemoveCar = async (id: number | undefined) => {
        try {
            await dispatch(deleteCarAsync(id));
            console.log('Car deleted successfully!');
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    }
    const onClickSelectCar = (id: number | undefined, name: string, color: string) => {
        setSelectedCarId(id)
        setUpdateName(name)
        setUpdateColor(color)
    }
    const onClickStartAllCar = () => {
        setStartedStoppedStatus('started');
        dispatch(clearCurrentRaceParticipants())
        setTimeout(() => dispatch(checkCurrentBestTime()), 3000)
        setTimeout(() => setIsOpen(true), currentWorstTime.bestTime!*1000)
    }

    useEffect(() => {
        dispatch(fetchCarsPageAsync(1));
        dispatch(fetchAllCarsAsync());
    }, [dispatch]);

    return (
        <div>
            <div>
                <CustomButton onClick={() => onClickStartAllCar()}>
                    Race
                </CustomButton>
                <CustomButton onClick={() => setStartedStoppedStatus('stopped')}>
                    Reset
                </CustomButton>
            </div>
            <div>
                {carsPage.map(car => {
                    return (
                        <CarItem
                            key={car.color}
                            startedStoppedStatus={startedStoppedStatus}
                            carId={car.id}
                            onClickRemove={() => onClickRemoveCar(car.id)}
                            onClickSelect={() => onClickSelectCar(car.id, car.name, car.color)}
                            name={car.name}
                            color={car.color}/>
                    )
                })}
            </div>
            <div>
                <CustomButton disabled={currentPage === 1}
                        onClick={() => onClickPageChange(currentPage - 1)}>
                    Previous
                </CustomButton>
                <span>Page {currentPage}</span>
                <CustomButton disabled={currentPage >= Math.ceil(cars.length / 7)}
                        onClick={() => onClickPageChange(currentPage + 1)}>
                    Next
                </CustomButton>
            </div>
            <div>{cars.length}</div>
        </div>
    );
};

export default GaragePagination;