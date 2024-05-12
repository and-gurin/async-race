import React from 'react'
import up from '../icons/up.svg'
import down from '../icons/down.svg'

const downIcon = down;
const upIcon = up;

export type CustomSortPropsType = {
    order: string,
    onChange: (newSort: string) => void
}

export const pureChange = (order: string, down: string, up: string) => {
    return order === down ?  up : down
}

const CustomSort: React.FC<CustomSortPropsType> = (
    {
        order,
        onChange,
    }
) => {
    const up = 'ASC';
    const down = 'DESC';
    const onChangeCallback = () => {
        onChange(pureChange(order, down, up))
    }
    const icon = order === down ? downIcon : upIcon

    return (
        <span
            onClick={onChangeCallback}
            style={{display: 'inline-block', paddingLeft: '5px'}}
        >
            <img
                src={icon}
                alt='sort icon'
            />
        </span>
    )
}

export default CustomSort
