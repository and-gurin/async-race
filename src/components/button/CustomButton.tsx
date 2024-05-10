import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import style from './Button.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    icon?: SVGSVGElement,
    xType?: string
}

const CustomButton: React.FC<SuperButtonPropsType> = (
    {
        icon,
        xType,
        className,
        disabled,
        ...restProps
    }
) => {

    const finalClassName = disabled ? style.button + ' ' + style.disabled
        : xType === 'big' ? style.button + ' ' + style.big
            : xType === 'secondary' ? style.button + ' ' + style.secondary
                : xType === 'default' ? style.button + ' ' + style.default
                : style.button

    return (
        <button className={finalClassName}
                disabled={disabled}
            {...restProps}
        />
    )
}

export default CustomButton;