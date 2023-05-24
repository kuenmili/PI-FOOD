import { getRecipeDetail, deleteRecipe } from '../../redux/actions';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
            return (
                <div className={style.apiSteps}>

                {steps.map((step) => (
                <div key={step.number} className={style.steps}>                    
                    <h2>Step {step.number}: </h2>
                    <ul>{step.ingredients.map((ingred, index) => {
                        return (
                            <ul key={index} className={style.ul}> <svg className= {style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M416 0C400 0 288 32 288 176V288c0 35.3 28.7 64 64 64h32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V352 240 32c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7V480c0 17.7 14.3 32 32 32s32-14.3 32-32V255.6c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16V150.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8V16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z"/>
                                </svg> {ingred.name}</ul>
                            )
                        })}</ul>
                                <p className={style.step}>{step.step}</p>
                </div>
            ))
                         }     </div>
            );
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
            <div className={style.dbSteps}>
                <h2>Steps: </h2>
                <p>{steps}</p>
            </div>
        ) : (
            returnApiSteps(steps)
        )}

        <div className={style.containerDelete}>
            <button
                onClick={onDelete}
                className={style.buttonDelete}
            >
                Delete Recipe
            </button>                             

        </div>
        </div>
    )
};

export default Detail;