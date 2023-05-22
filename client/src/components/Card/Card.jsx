import style from './style.module.css';
import { Link } from 'react-router-dom';
import React from 'react';

const Card = ({ id, image, title, diets }) => {
    
    return (
        <div className={style.itemContainer}>
            <div className={style.textContainer}>
                <Link to={`/detail/${id}`}>
                <img
                    className={style.image}
                    src={image}
                    alt={title}
                />
                </Link>
                    <h3>{title}</h3>            
                    <h4>Diets</h4>
                    <p>{diets.map(diet => diet + ', ')}</p>
            </div>
        </div>
    );
};

export default Card;