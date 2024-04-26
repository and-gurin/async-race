import React from 'react'
import s from '@/pages/404/Error404.module.css'
import error404 from '@/pages/404/404.svg'
const Error404 = () => {
    return (
        <div>
            <div className={s.wrapper}>
                <img src={error404} alt={'404'} className={s.error404} />
            </div>
        </div>
    )
}

export default Error404