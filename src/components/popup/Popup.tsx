import React from 'react';
import styles from './Popup.module.css';
import CustomButton from '../../components/button/CustomButton';
import {useAppSelector} from '../../hooks/useAppDispatch';

const PopUp = ({setIsOpen}: {setIsOpen: (isOpen: boolean) => void}) => {

    const {
        currentRace
    } = useAppSelector(state => state.winners);
    console.log(currentRace[0].time)

    return (
        <>
            <div className={styles.darkBG} onClick={() => setIsOpen(false)}/>
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <h5 className={styles.heading}>The winner's time is</h5>
                    <div className={styles.modalContent}>
                         {currentRace[0].time} sec.
                    </div>
                    <div style={{marginBottom: '12px'}}>
                        <CustomButton onClick={() => setIsOpen(false)}>
                            Ok
                        </CustomButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PopUp;