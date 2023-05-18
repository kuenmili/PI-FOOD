import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetail } from '../../redux/actions';
import { useParams } from "react-router-dom";
import style from './style.module.css';
import { useEffect } from "react";


const Detail = () => {
    
    const {id} = useParams();
    const dispatch = useDispatch();

    const recipe = useSelector(state => state.detail);

    useEffect(() => {
        dispatch(getRecipeDetail(id))
    }, [dispatch, id]);

    const { title, image, summary, diets, steps, healthScore} = recipe;
    console.log(recipe);
   
    return (
        <div>
            <h2>{title}</h2>
            <img
                className={style.img}
                src={image}
                alt={title}
            />
            <p>Summary: <span dangerouslySetInnerHTML={{ __html: summary }} /></p>
            <p>Health Score: {healthScore}</p>
            { diets && <p>Diets: { diets.map(( diet, index ) => {
                return <li key={index}>{diet}</li>
            })}</p>}
            { steps &&  steps.map((step, index) => {
                return (
                    <div key={index}>
                        <h2>Steps:</h2>
                        <h3>Step {index}: </h3>
                        <ul>{step.ingredients.map((ingred, index) => {
                            return (
                                <li key={index}>{ingred.name}</li>
                            )
                        })}</ul>
                        <p>{step.step}</p>
                    </div>
                )
            })
                
            }
        </div>
    )
};

export default Detail;