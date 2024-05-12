import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/useAppDispatch';
import {fetchAllCarsAsync, fetchCarsPageAsync, deleteCarAsync} from '../../features/garage/garageSlice';
import CarItem from '../../components/car-item/CarItem';
import CustomButton from '../../components/button/CustomButton';
import {fetchAllWinnersAsync} from '../../features/winners/winnersSlice';
import {restoreState, saveState} from '../../components/local-storage/localStorage';

const GaragePagination = ({setSelectedCarId, setUpdateName, setUpdateColor, startedStoppedStatus}: {
    setSelectedCarId: (id: number | undefined) => void,
    setUpdateName: (name: string) => void,
    setUpdateColor: (color: string) => void,
    startedStoppedStatus: '' | 'started' | 'stopped'
}) => {
    const dispatch = useAppDispatch();
    const {
        carsPage,
        currentPage,
        cars
    } = useAppSelector(state => state.garage);

    const onClickPageChange = async (page: number) => {
        try {
            await dispatch(fetchCarsPageAsync(page));
            saveState('currentGaragePage', page)
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
        try {
            const savedPage = restoreState('currentGaragePage', 1)
            dispatch(fetchCarsPageAsync(savedPage));
            dispatch(fetchAllCarsAsync());
            dispatch(fetchAllWinnersAsync())
        } catch (error) {
            console.error(error)
        }
    }, [dispatch]);

    return (
        <div>

            <div>
                {carsPage.map(car => {
                    return (
                        <CarItem
                            key={car.id}
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
                <CustomButton
                    disabled={currentPage === 1}
                    xType={'default'}
                        onClick={() => onClickPageChange(currentPage - 1)}
                >
                    Previous
                </CustomButton>
                <span>Page {currentPage}</span>
                <CustomButton
                    disabled={currentPage >= Math.ceil(cars.length / 7)}
                    xType={'default'}
                        onClick={() => onClickPageChange(currentPage + 1)}
                >
                    Next
                </CustomButton>
                <span>There are {cars.length} in total</span>
            </div>
        </div>
    );
};

export default GaragePagination;