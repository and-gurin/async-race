import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import style from './Button.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    icon?: SVGSVGElement
}

const CustomButton: React.FC<SuperButtonPropsType> = (
    {
        icon,
        ...restProps
    }
) => {
    return (
        <button className={style.button}
            {...restProps}
        />
    )
}

export default CustomButton;