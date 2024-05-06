import React from 'react';
import styles from './Popup.module.css';
import CustomButton from '../../components/button/CustomButton';
import {useAppSelector} from '../../hooks/useAppDispatch';

const PopUp = ({setIsOpen}: {setIsOpen: (isOpen: boolean) => void}) => {

    const {
        currentBestTime
    } = useAppSelector(state => state.winners);

    return (
        <>
            <div className={styles.darkBG} onClick={() => setIsOpen(false)}/>
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <h5 className={styles.heading}>The winner is</h5>
                    <div className={styles.modalContent}>
                        {currentBestTime.name} with time {currentBestTime.bestTime} sec.
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