import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetail, deleteRecipe } from '../../redux/actions';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import style from './style.module.css';
import { useEffect } from "react";


const Detail = () => {
    
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const recipe = useSelector(state => state.detail);

    const onDelete = () => {
        dispatch(deleteRecipe(id));
        history.push('/home');
    };

    useEffect(() => {
        dispatch(getRecipeDetail(id))
    }, [dispatch, id]);

    
    const { title, image, summary, diets, steps, healthScore, created } = recipe;

    const returnApiSteps = (steps) => {
        if (steps) {
            return steps.map((step) => (
                <div key={step.number} className={style.steps}>                    
                    <h2>Step {step.number}: </h2>
                    <ul>{step.ingredients.map((ingred, index) => {
                                    return (
                                        <li key={index}>{ingred.name}</li>
                                    )
                                })}</ul>
                                <p className={style.step}>{step.step}</p>
                </div>
            ));
        }
        return null;
    };
       
    return (
        <div className={style.container}>
            <div className={style.firstpart}>
                <img
                    className={style.img}
                    src={image}
                    alt={title}
                    />
                <div className={style.info}>
                    <h2>{title}</h2>
                    <p className={style.summary}>Summary: <span dangerouslySetInnerHTML={{ __html: summary }} className={style.summary} /></p>
                </div>
            </div>
            <div className={style.health}>
                <p>Health Score: {healthScore}</p>
            { diets && 
                <p className={style.diets}>Diets: 
                    { diets.map(( diet, index ) => 
                        {
                            return <li key={index}>{diet}</li>
                        })
                    }
                </p>
            }
            </div>
            {steps && created ? (
            <>
                <div>Steps:</div>
                <p>{steps}</p>
            </>
        ) : (
            returnApiSteps(steps)
        )}
            <button
                onClick={onDelete}
                className={style.buttonDelete}
            >
                Delete Recipe
            </button>                             
        </div>
    )
};

export default Detail;