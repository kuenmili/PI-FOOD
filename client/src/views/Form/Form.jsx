import validation from '../../components/Validation/Validation';
import { createRecipe, getAllDiets } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from "react";
import style from './style.module.css';



const Form = () => {

  const dispatch = useDispatch();
  const history = useHistory(); 
  const diets = useSelector((state) => state.diets);

  const [ dietsSelected, setDietsSelected] = useState([]);

  const [recipeData, setRecipeData] = useState({
    title: '',
    summary: '',
    diets: [],
    image: '',
    steps: '',
    healthScore: 0,
   });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getAllDiets())
  }, [dispatch]);
  
  const handleChange = (event) => {
    const property = event.target.name;
    let value = event.target.value;

    if (property === "healthScore") {
      value = parseInt(value, 10);    }
      
    setRecipeData({...recipeData, [property] : value});
      
    setErrors(validation({
        ...recipeData,
        [property]: value
      }))
  };
    
  function handleSelect(event){
    debugger;
    // eslint-disable-next-line eqeqeq
    let filteredDiet = diets.find(el => el.value == event.target.value)

    setRecipeData({
        ...recipeData,
        diets: [...recipeData.diets, filteredDiet],
    })
    setDietsSelected([...dietsSelected, filteredDiet]);
}
  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    dispatch(createRecipe(recipeData));
   
    setRecipeData({
      title: '',
      summary: '',
      healthScore: '',
      diets: [],
      steps: '',
      image: '',      
    });    
    history.push('/home');  
  };   

  
    
  return (
        <div className={style.form}>
          <div className={style.divButton}>
            <button onClick={() => history.push('/home')}>Back</button>
          </div>
          <form onSubmit={handleSubmit} >
            <div>
              <h2>Create Your Recipe!</h2>
            </div>

            <div>
              <input type="text" name="title" placeholder="Recipe's name" value={recipeData.title} onChange={handleChange}/>
              {errors.title && <p className={style.error}>{errors.title}</p>}
            </div>

            <div>
              <input type="text" name="summary" placeholder="Recipe's summary" value={recipeData.summary} onChange={handleChange}/>
              {errors.summary && <p className={style.error}>{errors.summary}</p>}
            </div>

            <p>Heath Score: </p>
            <div className={style.rating}>
              <label htmlFor="healthScore">
              <input type="number" name="healthScore" placeholder="Health Score" value={recipeData.healthScore} onChange={handleChange} />
              </label>
            </div>

            <div>
              <label htmlFor="steps">Steps: </label>
              <textarea type="text" value= {recipeData.steps} name='steps'placeholder='Enter steps' onChange={handleChange}  max='10' min='1'/>       
            </div>

            <div>
              <input type="text" name= 'image' placeholder="Image's Url" value={recipeData.image} onChange={handleChange}/>
              {errors.image && <p className={style.error}>{errors.image}</p>}
            </div>

            <select name="diets" onChange={(event)=> handleSelect(event)}>
                    {diets.map((el)=> {
                      console.log(diets);
                        return (
                            <option value={el.value}>{el.text}</option>
                        )
                    })} 
                </select>
                <ul>
                    {
                        dietsSelected.map(el => <li>{el.text}</li>)
                    }
                </ul>

            <button type="submit">Create</button>

          </form>
        </div>
    )
};

export default Form;