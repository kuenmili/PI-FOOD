import style from './style.module.css';
import { Link } from 'react-router-dom';
import React from 'react';

const Card = ({ id, image, title, diets }) => {
    const dietsName = diets?.map((element) => element + ',');
    return (
        <div className={style.container}>
            <Link to={`/recipes/${id}`}>
            <img
                className={style.img}
                loading="lazy"
                src={image}
                alt={title}
            />
            </Link>
            <div className={style.title}>
                <p>{title}</p>
            </div>
            <div className={style.dietsContainer}>
                <p>Diets</p>
                <div>
                    {dietsName.slice(0, 2).map((diet, i) => (
                            <span key={i * 2}>{diet}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Card;