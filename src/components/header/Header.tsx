import React from 'react';
import CustomButton from '../../components/button/CustomButton';
import {Link} from 'react-router-dom';
import style from './Header.module.css'

const Header = () => {
    return (
        <header className={style.header}>
            <div className={style.header__wrapper}>
                <CustomButton xType={'big'}>
                    <Link to={'/garage'}>
                        Garage
                    </Link>
                </CustomButton>
                <CustomButton xType={'big'}>
                    <Link to={'/winners'}>
                        Winners
                    </Link>
                </CustomButton>
            </div>
        </header>
    );
};

export default Header;