import style from './style.module.css';
import { Link } from 'react-router-dom';
import React from 'react';

const Card = ({ id, image, title, diets }) => {
    
    return (
        <div className={style.container}>
            <Link to={`/detail/${id}`}>
            <img
                className={style.img}
                src={image}
                alt={title}
            />
            </Link>
            <div className={style.title}>
                <h3>{title}</h3>
            </div>
            <div className={style.dietsContainer}>
                <h4>Diets</h4>
                <div>
                    {diets.map(diet => diet + ', ')}
                </div>
            </div>
        </div>
    );
};

export default Card;