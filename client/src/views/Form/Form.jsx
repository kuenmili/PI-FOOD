import {  faTimes,faCloudUploadAlt  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { uploadImage } from '../../components/Firebase/client';
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

  const [loading, setLoading] = useState(false);
  const [ dietsSelected, setDietsSelected] = useState([]);
  const [errorImage, setErrorImage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [percentage, setPercentage] = useState(0)
  const [imagePreview, setImagePreview] = useState("");
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
    console.log(property, value);

    if (property === "healthScore") {
      value = parseInt(value, 10);    }
      
    setRecipeData({...recipeData, [property] : value});
      
    setErrors(validation({
        ...recipeData,
        [property]: value
      }))
  };
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;
    if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/jpg'
    ) {
      setErrorImage('Tipo de archivo inválido');
      return;
    }
    try {
      const task = uploadImage(file);
      setIsEditing(true)
      task.on(
        'state_changed',
        (snapshot) => {
          const percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPercentage(percentage)
        },
        (error) => {
          console.log(error);
        },
        () => {
          task.snapshot.ref.getDownloadURL().then((url) => {
            setIsEditing(false)
            setRecipeData((prevData) => ({
              ...prevData,
              image: url,
            }));
            setImagePreview(url);
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
    
  const handleSelect = (event) => {   

    const { value, checked } = event.target;

    if (checked){
      const filteredDiet = diets.find(el => el.value == value)
    setRecipeData({
        ...recipeData,
        diets: [...recipeData.diets, filteredDiet],
    })
    setDietsSelected([...dietsSelected, filteredDiet]);
    }   
  }

  const handleImageRemove = () => {  
    setRecipeData({
      ...recipeData,
      image: ""
    });
    setImagePreview("");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if(recipeData.title !== ""){
      dispatch(createRecipe(recipeData));
      setRecipeData({
        title: '',
        summary: '',
        healthScore: '',
        diets: [],
        steps: '',
        image: '',      
      })
      window.alert('Recipe created successfully'); 
      history.push('/home');  
      }  
       else {
        alert("Must fill in the blanks")
    }
  }
    
    
  return (
        <div className={style.all}>
            
              
          <div className={style.imgContainer}>
          {
            imagePreview 
            ?
            
             <div  className={style.imgPreview}>
              <img
                className={style.image}
                src={imagePreview}
                alt=""
                />       
         
              <button
                type="button"
                onClick={() => handleImageRemove()}
                className={style.remove}
                >
                <FontAwesomeIcon icon={faTimes} className={style.iconremove} />
              </button>          
             
              </div>
          : 
          <>
          <label class={style.customUpload} for="file">
          <div class={style.icon}>
          <FontAwesomeIcon icon={faCloudUploadAlt} />
          </div>
          <div class={style.text}>
             <span>Click to upload image</span>
              {isEditing ?  (
                <progress value={percentage} max="100" className={style.progress}></progress>
                ) : null}
      </div>
             <input className= {style.inputimg} type="file" id="file" onChange={handleUploadImage}/>
          </label>      
         
          
          </>
          
          }

          
            </div>
       
         

          <form onSubmit={handleSubmit} className={style.form}>
            
            <h2 className={style.create}>Create Your Recipe!</h2>

            <input type="text" name="title" placeholder="Recipe's name" value={recipeData.title} onChange={handleChange} className={style.name}/>
              {errors.title && <p className={style.error}>{errors.title}</p>}

            <textarea type="text" name="summary" placeholder="Recipe's summary" value={recipeData.summary} onChange={handleChange} className={style.summary}/>
              {errors.summary && <p className={style.error}>{errors.summary}</p>}

            <p className={style.health}>Heath Score: </p>

            <div className={style.rating}>
              <label htmlFor="healthScore">
              <input type="number" name="healthScore" placeholder="Health Score" value={recipeData.healthScore} onChange={handleChange} className={style.write}/>
                {errors.healthScore && <p className={style.error}>{errors.healthScore}</p>} 
              </label>
            </div>

            <label htmlFor="steps">Steps: </label>
            
            <textarea type="text" value= {recipeData.steps} name='steps'placeholder='Enter steps' onChange={handleChange}  className={style.steps}/>       
              {errors.steps && <p className={style.error}>{errors.steps}</p>}

            
            <div onChange={(event)=> handleSelect(event)} className={style.write}>
              {diets.map((el, index)=> {
                return (
                  <>
                        <label htmlFor={index}>{el.text}</label>
                        <input id={index} name='diets' type= 'checkbox' value={el.value}/>
                  </> 
                        )
                })
              } 
            </div>
            
            <button type="submit" className={style.button}>Create</button>
          </form>
        </div>
    )
};

export default Form;