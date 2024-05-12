import React, {useEffect, useRef, useState} from 'react';
import CustomButton from '../button/CustomButton';
import CarIcon from '../../components/icons/Car-icon';
import {AsyncRaceAPI} from '../../api/api';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {createCurrentRaceParticipants} from '../../features/winners/winnersSlice';
import style from './CarItem.module.css'

const CarItem = ({name, color, onClickSelect, onClickRemove, carId, startedStoppedStatus}: {
    name: string,
    color: string,
    onClickSelect: () => void,
    onClickRemove: () => void,
    carId: number | undefined,
    startedStoppedStatus: 'started' | 'stopped' | ''
}) => {

    const [currentPosition, setCurrentPosition] = useState(0);
    const [animationId, setAnimationId] = useState<number | null>(null);
    const carRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const stopAnimationFlag = useRef(false);

    const dispatch = useAppDispatch();

    const startAnimation = (velocity: number) => {
        stopAnimationFlag.current = false;
        let position = currentPosition;
        const moveCar = () => {
            position += velocity/30;
            if (!stopAnimationFlag.current && carRef.current) {
                if (position <= window.innerWidth - 320) {
                    carRef.current.style.left = `${position}px`;
                    setCurrentPosition(position);
                } else {
                    cancelAnimationFrame(animationId!);
                    setAnimationId(null);
                }
                setAnimationId(requestAnimationFrame(moveCar));
            }
        };
        if (!animationId) {
            setAnimationId(requestAnimationFrame(moveCar));
        }
    };

    const onClickStartCar = async () => {
        try {
            const raceData = await AsyncRaceAPI.startStopEngine(carId, 'started');
            const raceTime = Math.round(raceData.distance / raceData.velocity / 10) / 100;
            dispatch(createCurrentRaceParticipants({id: carId, time: raceTime, wins: 1}))
            console.log(raceData.velocity, raceTime, carId);
            startAnimation(raceData.velocity);

            await AsyncRaceAPI.switchCarDrive(carId, 'drive');
        }
        catch (error) {
            stopCar()
        }
    }
    const stopCar = async () => {
        await AsyncRaceAPI.startStopEngine(carId, 'stopped');
        stopAnimationFlag.current = true;
        if (animationId) {
            cancelAnimationFrame(animationId);
            setAnimationId(null);
            setCurrentPosition(0);
            if (carRef.current) {
                carRef.current.style.left = '0px';
            }
        }
    };

    useEffect(() => {
        if (startedStoppedStatus === 'started') {
            onClickStartCar()
        } else if (startedStoppedStatus === 'stopped') {
            stopCar()
        }
    }, [startedStoppedStatus])

    return (
        <div className={style.car}>
            <div className={style.car__buttons}>
                <CustomButton onClick={onClickSelect} xType={'secondary'}>
                    Select
                </CustomButton>
                <CustomButton onClick={onClickRemove} xType={'secondary'}>
                    Remove
                </CustomButton>
            </div>
            <div className={style.car__buttons}>
                <CustomButton onClick={onClickStartCar} xType={'secondary'}>
                    A
                </CustomButton>
                <CustomButton onClick={stopCar} xType={'secondary'}>
                    B
                </CustomButton>
            </div>
            <div className={style.car__container} ref={containerRef}
                 style={{}}>
                <div className={style.car__icon} ref={carRef}>
                    <CarIcon color={color}/>
                </div>
                <span className={style.car__title}>{name}</span>
            </div>

        </div>
    );
};

export default CarItem;