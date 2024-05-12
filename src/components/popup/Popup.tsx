import React, {useEffect} from 'react';
import styles from './Popup.module.css';
import CustomButton from '../../components/button/CustomButton';
import {useAppDispatch, useAppSelector} from '../../hooks/useAppDispatch';
import {clearCurrentRaceParticipants, createWinnerAsync} from '../../features/winners/winnersSlice';

const PopUp = ({setIsOpen}: {setIsOpen: (isOpen: boolean) => void}) => {

    const {
        currentRace
    } = useAppSelector(state => state.winners);
    const dispatch = useAppDispatch();
    const onClickOk = () => {
        setIsOpen(false);
        dispatch(clearCurrentRaceParticipants())
    }

    useEffect(() => {
        dispatch(createWinnerAsync({
            id: currentRace[0].id,
            wins: currentRace[0].wins,
            time: currentRace[0].time,}))
    }, [dispatch]);

    return (
        <>
            <div className={styles.darkBG}/>
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <h5 className={styles.heading}>The winner's time is</h5>
                    <div className={styles.modalContent}>
                         {currentRace[0].time} sec.
                    </div>
                    <div style={{marginBottom: '12px'}}>
                        <CustomButton xType={'default'} onClick={onClickOk}>
                            Ok
                        </CustomButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PopUp;