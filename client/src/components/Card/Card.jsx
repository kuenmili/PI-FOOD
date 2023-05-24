import style from './style.module.css';
import { Link } from 'react-router-dom';
import React from 'react';

const Card = ({ id, image, title, diets }) => {
    
    return (
        <div className={style.itemContainer}>
            <div className={style.textContainer}>                
                <img
                    className={style.image}
                    src={image}
                    alt={title}
                />
                <h3>{title}</h3>            
                <h4>Diets</h4>
                <p>{diets.map(diet => diet + ', ')}</p>
                <Link to={`/detail/${id}`}>
                    <button className={style.btn}>View Details</button>
                </Link>
            </div>
        </div>
    );
};

export default Card;