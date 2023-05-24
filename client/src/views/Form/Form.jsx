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
    
  const handleSelect = (event) => {   
   
    const filteredDiet = diets.find(el => el.value === event.target.value)

    setRecipeData({
        ...recipeData,
        diets: [...recipeData.diets, filteredDiet],
    })
    setDietsSelected([...dietsSelected, filteredDiet]);
  }

  const handleSubmit = (event) => {
    event.preventDefault(); 
    
    
    if (recipeData.title === "" ){
      alert('Fill in the required blanks')
    }
    else{
      dispatch(createRecipe(recipeData));
      setRecipeData({
        title: '',
        summary: '',
        healthScore: '',
        diets: [],
        steps: '',
        image: '',      
      });   
      window.alert('Recipe created successfully'); 
      history.push('/home');  
    }    
  };  
    
  return (
        <div className={style.all}>
          <div className={style.divButton}>
            <img className= { style.img } src={process.env.PUBLIC_URL + '/Form.png'} alt="Landing" />
          </div>

          <form onSubmit={handleSubmit} className={style.form}>
            
            <h2 className={style.create}>Create Your Recipe!</h2>

            <input type="text" name="title" placeholder="Recipe's name" value={recipeData.title} onChange={handleChange}/>
              {errors.title && <p className={style.error}>{errors.title}</p>}

            <textarea type="text" name="summary" placeholder="Recipe's summary" value={recipeData.summary} onChange={handleChange} className={style.summary}/>
              {errors.summary && <p className={style.error}>{errors.summary}</p>}

            <p>Heath Score: </p>

            <div className={style.rating}>
              <label htmlFor="healthScore">
              <input type="number" name="healthScore" placeholder="Health Score" value={recipeData.healthScore} onChange={handleChange} />
                {errors.healthScore && <p className={style.error}>{errors.healthScore}</p>} 
              </label>
            </div>

            <label htmlFor="steps">Steps: </label>
            
            <textarea type="text" value= {recipeData.steps} name='steps'placeholder='Enter steps' onChange={handleChange}  className={style.steps}/>       
              {errors.steps && <p className={style.error}>{errors.steps}</p>}

            <input type="text" name= 'image' placeholder="Image's Url" value={recipeData.image} onChange={handleChange}/>
              {errors.image && <p className={style.error}>{errors.image}</p>}
            
            <select name="diets" onChange={(event)=> handleSelect(event)}>
              {diets.map((el)=> {
                return (
                        <option value={el.value}>{el.text}</option>
                        )
                })
              } 
            </select>
            <ul>
              {
                dietsSelected.map(el => <li>{el.text}</li>)
              }
            </ul>

            <button type="submit" className={style.button}>Create</button>
          </form>
        </div>
    )
};

export default Form;