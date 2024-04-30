import React, {ChangeEvent, useState} from 'react';
import style from '../garage/garage.module.css'
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {
    createCarAsync,
    generateCarsAsync,
    updateCarAsync
} from '../../features/garage/garageSlice';
import CustomButton from '../../components/button/CustomButton';
import GaragePagination from '../../components/garage-pagination/GaragePagination';


const Garage = () => {
    const [newColor, setNewColor] = useState('');
    const [newName, setNewName] = useState('');
    const [updateColor, setUpdateColor] = useState('');
    const [updateName, setUpdateName] = useState('');
    const [selectedCarId, setSelectedCarId] = useState<number | undefined>(0);
    const onChangeNewColor = (e: ChangeEvent<HTMLInputElement>) => {
        setNewColor(e.currentTarget.value)
    }
    const onChangeNewName = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
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
        setUpdateColor(e.currentTarget.value)
    }
    const onChangeUpdateName = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateName(e.currentTarget.value)
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

    return (
        <section className={style.garage}>
            <header className={style.garage__header}>
                <div className={style.garage__buttons}>
                    <CustomButton title={'Race'} onClick={() => {
                    }}/>
                    <CustomButton title={'Reset'} onClick={() => {
                    }}/>
                </div>
                <div className={style.garage__buttons}>
                    <input value={newName}
                           onChange={onChangeNewName}
                           className={style.garage__input}
                           type={"text"}/>
                    <input value={newColor}
                           onChange={onChangeNewColor}
                           className={style.garage__input}
                           type={"color"}/>
                    <button onClick={onClickCreateCar}>
                        Create
                    </button>
                </div>
                <div className={style.garage__buttons}>
                    <input value={updateName}
                           onChange={onChangeUpdateName}
                           className={style.garage__input}
                           type={"text"}/>
                    <input value={updateColor}
                           onChange={onChangeUpdateColor}
                           className={style.garage__input}
                           type={"color"}/>
                    <CustomButton onClick={onClickUpdateCar}>
                        Update
                    </CustomButton>
                </div>
                <CustomButton onClick={onClickGenerateCars}>
                    Generate cars
                </CustomButton>
            </header>
            <div>
                <GaragePagination
                    setSelectedCarId={setSelectedCarId}
                    setUpdateName={setUpdateName}
                    setUpdateColor={setUpdateColor}/>
            </div>
        </section>
    );
};

export default Garage;