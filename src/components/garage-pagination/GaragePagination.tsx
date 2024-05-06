import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/useAppDispatch';
import {fetchAllCarsAsync, fetchCarsPageAsync} from '../../features/garage/garageSlice';
import CarItem from '../../components/car-item/Car-item';
import {deleteCarAsync} from '../../features/garage/garageSlice';
import CustomButton from '../../components/button/CustomButton';

const GaragePagination = ({setSelectedCarId, setUpdateName, setUpdateColor}: {
    setSelectedCarId: (id: number | undefined) => void,
    setUpdateName: (name: string) => void,
    setUpdateColor: (color: string) => void,
}) => {
    const [startedStoppedStatus, setStartedStoppedStatus] = useState<'' | 'started' | 'stopped'>('');
    const dispatch = useAppDispatch();
    const {
        carsPage,
        currentPage,
        cars
    } = useAppSelector(state => state.garage);

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

    useEffect(() => {
        dispatch(fetchCarsPageAsync(1));
        dispatch(fetchAllCarsAsync());
    }, [dispatch]);

    return (
        <div>
            <div>
                <CustomButton onClick={() => setStartedStoppedStatus('started')}>
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
                <button disabled={currentPage === 1} onClick={() => onClickPageChange(currentPage - 1)}>Previous</button>
                <span>Page {currentPage}</span>
                <button disabled={currentPage >= Math.ceil(cars.length / 7)} onClick={() => onClickPageChange(currentPage + 1)}>Next</button>
            </div>
            <div>{cars.length}</div>
        </div>
    );
};

export default GaragePagination;