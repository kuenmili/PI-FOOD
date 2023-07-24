import React from 'react';

import style from './onLoadingGlobal.module.css';
const  LoadingGlobal = () => {
    return (
        <>
            <div className={style.loader}>
            <img
                    className={style.img}
                    src={process.env.PUBLIC_URL + '/loading.gif'}
                    alt=""
                    />
            </div>
        </>
    );
};
export default LoadingGlobal