import React from 'react';
import style from 'src/pages/garage/garage.module.scss'
import Button from "@components/button/Button";

const Garage = () => {
    return (
        <section className={style.garage}>
            <header className={style.garage__header}>
                <div className={style.garage__buttons}>
                    <Button title={'Race'} onClick={() => {}}/>
                    <Button title={'Reset'} onClick={() => {}}/>
                </div>
                <div className={style.garage__buttons}>
                    <input className={style.garage__input} type={"color"}/>
                    <Button title={'Create'} onClick={() => {}}/>
                </div>
                <div className={style.garage__buttons}>
                    <input className={style.garage__input} type={"color"}/>
                    <Button title={'Update'} onClick={() => {}}/>
                </div>
                <Button title={'Generate cars'} onClick={() => {}}/>
            </header>
            <div></div>
        </section>
    );
};

export default Garage;