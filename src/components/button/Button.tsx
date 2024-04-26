import React from 'react';
import style from "src/components/button/Button.module.css"

export type ButtonPropsType = {
    title: string,
    icon?: SVGSVGElement,
    onClick: () => void,
}

const Button = ({title, icon, onClick}: ButtonPropsType) => {
    return (
        <button className={style.button} onClick={onClick}>
            <>
                {title}
                {icon}
            </>
        </button>
    );
};

export default Button;