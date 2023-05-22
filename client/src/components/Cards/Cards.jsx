/*import { useSelector } from 'react-redux';
import style from './style.module.css';
import Card from '../Card/Card'

const Cards = () => {

    const recipes = useSelector(state => state.recipes);

    return (
        <div className={style.container}>
            
            {recipes.map(recipe => {
                return <Card
                key={recipe.id}
                id={recipe.id}
                image={recipe.image}
                title={recipe.title}
                diets={recipe.diets}
                />
            })}

        </div>
    )
};

export default Cards;*/