import React from 'react';
import CustomButton from '../../components/button/CustomButton';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <CustomButton>
                <Link to={'/garage'}>
                    Garage
                </Link>
            </CustomButton>
            <CustomButton>
                <Link to={'/winners'}>
                    Winners
                </Link>
            </CustomButton>
        </div>
    );
};

export default Header;