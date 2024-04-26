import React, {ChangeEvent, useState} from 'react';
import style from './garage.module.css'
import Button from 'src/components/button/Button';
import {useAppDispatch, useAppSelector} from 'src/hooks/useAppDispatch';
import {createCarAsync} from 'src/features/garage/garageSlice';
import CarItem from 'src/components/car-item/Car-item';

const Garage = () => {
    const [newColor, setNewColor] = useState('');
    const [newName, setNewName] = useState('');
    const [updateColor, setUpdateColor] = useState('');
    const [updateName, setUpdateName] = useState('');
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
    }
    const onChangeUpdateColor = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateColor(e.currentTarget.value)
    }
    const onChangeUpdateName = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateName(e.currentTarget.value)
    }
    const onClickUpdateCar = async () => {
        try {
            await dispatch(createCarAsync({name: newName, color: newColor}));
            console.log('Car updated successfully!');
        } catch (error) {
            console.error('Error updating car:', error);
        }
        setNewName('')
    }

    const dispatch = useAppDispatch();
    const cars = useAppSelector(state => state.garage);

    return (
        <section className={style.garage}>
            <header className={style.garage__header}>
                <div className={style.garage__buttons}>
                    <Button title={'Race'} onClick={() => {}}/>
                    <Button title={'Reset'} onClick={() => {}}/>
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
                    <Button title={'Create'} onClick={onClickCreateCar}/>
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
                    <Button title={'Update'} onClick={onClickUpdateCar}/>
                </div>
                <Button title={'Generate cars'} onClick={() => {}}/>
            </header>
            <div>
                {cars.map(car => {
                    return (
                        <CarItem key={car.id} name={car.name} color={car.color}/>
                    )
                })}
            </div>
        </section>
    );
};

export default Garage;