import React, {ChangeEvent, useEffect, useState} from 'react';
import style from './Garage.module.css'
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {
    createCarAsync,
    generateCarsAsync,
    updateCarAsync
} from '../../features/garage/garageSlice';
import CustomButton from '../../components/button/CustomButton';
import GaragePagination from '../../components/garage-pagination/GaragePagination';
import PopUp from '../../components/popup/Popup';
import {restoreState, saveState} from '../../components/local-storage/localStorage';

const Garage = () => {
    const [newColor, setNewColor] = useState('');
    const [newName, setNewName] = useState('');
    const [updateColor, setUpdateColor] = useState('');
    const [updateName, setUpdateName] = useState('');
    const [selectedCarId, setSelectedCarId]
        = useState<number | undefined>(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const onChangeNewColor = (e: ChangeEvent<HTMLInputElement>) => {
        setNewColor(e.currentTarget.value);
        saveState('currentNewColor', e.currentTarget.value)
    }
    const onChangeNewName = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value);
        saveState('currentNewName', e.currentTarget.value)
    }
    const onClickCreateCar = async () => {
        try {
            await dispatch(createCarAsync({name: newName, color: newColor}));
            console.log('Car created successfully!');
        } catch (error) {
            console.error('Error creating car:', error);
        }
        setNewName('')
        setNewColor('')
    }
    const onChangeUpdateColor = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateColor(e.currentTarget.value);
        saveState('currentUpdateColor', e.currentTarget.value)
    }
    const onChangeUpdateName = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateName(e.currentTarget.value);
        saveState('currentUpdateName', e.currentTarget.value)
    }
    const onClickUpdateCar = async () => {
        try {
            await dispatch(updateCarAsync(selectedCarId, {name: updateName, color: updateColor}));
            console.log('Car updated successfully!');
        } catch (error) {
            console.error('Error updating car:', error);
        }
        setUpdateName('')
        setUpdateColor('')
    }
    const onClickGenerateCars = async () => {
        try {
            await dispatch(generateCarsAsync());
            console.log('Car created successfully!');
        } catch (error) {
            console.error('Error creating car:', error);
        }
        setNewName('')
        setNewColor('')
    }
    const dispatch = useAppDispatch();

    useEffect(() => {
        const savedNewColor = restoreState('currentNewColor', '');
        setNewColor(savedNewColor);
        const savedNewName = restoreState('currentNewName', '');
        setNewColor(savedNewName);
        const savedUpdatedColor = restoreState('currentUpdatedColor', '');
        setNewColor(savedUpdatedColor);
        const saveUpdatedName = restoreState('currentUpdatedName', '');
        setNewColor(saveUpdatedName);
    }, []);

    return (
        <section className={style.garage}>
            {isPopupOpen && <PopUp setIsOpen={setIsPopupOpen}/>}
            <div className={style.garage__wrapper}>
                <header className={style.garage__header}>
                    <div className={style.garage__buttons}>
                        <input value={newName}
                               placeholder={'Enter the name'}
                               onChange={onChangeNewName}
                               className={style.garage__input_text}
                               type={"text"}/>
                        <input value={newColor}
                               onChange={onChangeNewColor}
                               className={style.garage__input_color}
                               type={"color"}/>
                        <CustomButton onClick={onClickCreateCar} xType={'default'}>
                            Create
                        </CustomButton>
                    </div>
                    <div className={style.garage__buttons}>
                        <input value={updateName}
                               placeholder={'Enter the name'}
                               onChange={onChangeUpdateName}
                               className={style.garage__input_text}
                               type={"text"}/>
                        <input value={updateColor}
                               onChange={onChangeUpdateColor}
                               className={style.garage__input_color}
                               type={"color"}/>
                        <CustomButton onClick={onClickUpdateCar} xType={'default'}>
                            Update
                        </CustomButton>
                    </div>
                    <CustomButton onClick={onClickGenerateCars} xType={'default'}>
                        Generate cars
                    </CustomButton>
                </header>
                <div>
                    <GaragePagination
                        setSelectedCarId={setSelectedCarId}
                        setIsOpen={setIsPopupOpen}
                        setUpdateName={setUpdateName}
                        setUpdateColor={setUpdateColor}/>
                </div>
            </div>
        </section>
    );
};

export default Garage;