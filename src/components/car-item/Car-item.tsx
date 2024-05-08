import React, {useEffect, useRef, useState} from 'react';
import CustomButton from '../button/CustomButton';
import CarIcon from '../../components/icons/Car-icon';
import {AsyncRaceAPI} from '../../api/api';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {createCurrentRaceParticipants} from '../../features/winners/winnersSlice';

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

    const startAnimation = (velosity: number) => {
        //const animationDuration = raceTime*1000;
        //const animationStartTime = performance.now();
        stopAnimationFlag.current = false;
        let position = currentPosition;
        const moveCar = () => {
            //const elapsedTime = performance.now() - animationStartTime;
            //const progress = elapsedTime / animationDuration;
            position += velosity/25;
            if (!stopAnimationFlag.current && carRef.current) {
                //const containerWidth = containerRef.current.offsetWidth;
                //const carWidth = carRef.current.offsetWidth;
                if (position <= window.innerWidth - 100) {
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


    // const startAnimation = (raceTime: number,) => {
    //     if (animationId === null) {
    //         let position = currentPosition;
    //         const moveCar = () => {
    //             position += raceTime;
    //             if (carRef.current && position <= window.innerWidth) {
    //                 carRef.current.style.left = position + 'px';
    //                 const id = requestAnimationFrame(moveCar);
    //                 setAnimationId(id);
    //             } else {
    //                 cancelAnimationFrame(animationId!);
    //                 setCurrentPosition(0)
    //             }
    //         };
    //         moveCar();
    //     }
    // };
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
    // const stopCar = async () => {
    //     await AsyncRaceAPI.startStopEngine(carId, 'stopped');
    //     cancelAnimationFrame(animationId!);
    //     setAnimationId(null);
    //     setCurrentPosition(0)
    //     if (carRef.current) {
    //         carRef.current.style.left = '0px';
    //     }
    // };

    useEffect(() => {
        if (startedStoppedStatus === 'started') {
            onClickStartCar()
        } else if (startedStoppedStatus === 'stopped') {
            stopCar()
        }
    }, [startedStoppedStatus])

    return (
        <div>
            <div>
                <CustomButton onClick={onClickSelect}>
                    Select
                </CustomButton>
                <CustomButton onClick={onClickRemove}>
                    Remove
                </CustomButton>
            </div>
            <CustomButton onClick={onClickStartCar}>
                A
            </CustomButton>
            <CustomButton onClick={stopCar}>
                B
            </CustomButton>
            <div ref={containerRef}
                 style={{position: 'relative', width: '500px', height: '30px', border: '1px solid black'}}>
                <div ref={carRef} style={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                }}>
                    <CarIcon color={color}/>
                </div>
            </div>
            <span>{name}</span>
        </div>
    );
};

export default CarItem;