import axios from 'axios';
import {  
    ORDER_BY_ORIGIN,
    DELETE_FILTERS,
    ORDER_BY_NAME,
    ORDER_BY_HEALTH_SCORE,
    DELETE_RECIPE,
    GET_DIETS,
    GET_RECIPES,
    GET_RECIPE_DETAIL,
    ORDER_BY_DIETS,   
    SEARCH_RECIPE,  
} from './action-types';

const URL = 'http://localhost:3001';


export const getAllRecipes = () => async (dispatch) => {
        const apiData = await axios.get(`${URL}/recipes`);
        dispatch({ type: GET_RECIPES, payload: apiData.data });      
};

export const getAllDiets = () => async (dispatch) => {
    const { data } = await axios.get(`${URL}/diets`);    
    dispatch({ type: GET_DIETS, payload: data });
};

export const getRecipeDetail = (id) => async (dispatch) => {       
    const { data } = await axios.get(`${URL}/recipes/${id}`);
    dispatch({ type: GET_RECIPE_DETAIL, payload: data });
};

export const searchRecipe = (name) => {
  return async (dispatch) => {
      const response = await axios.get(`${URL}/recipes/?title=${name}`);
      dispatch({
        type: SEARCH_RECIPE,
        payload: response.data      
      });
  };
};

export const createRecipe = (newRecipe) => {
    return async function () {       
      const res = await axios.post(`${URL}/recipes`, newRecipe);
      return res;            
    };
};
export const deleteRecipe = (recipeId) => 
  async (dispatch) => {
    await axios.delete(`${URL}/recipes/${recipeId}`);
    dispatch({ type: DELETE_RECIPE });
};


// ORDERS AND FILTERS

  export const orderByName = (payload) => {
    return (dispatch) => {
      return dispatch({
        type: ORDER_BY_NAME,
        payload,
      });
    };
  };
  
  export const orderByHealtScore = (payload) => {
    return (dispatch) => {
      return dispatch({
        type: ORDER_BY_HEALTH_SCORE,
        payload,
      });
    };
  };
  
  export const orderByDiets = (payload) => {
    return (dispatch) => {
      return dispatch({
        type: ORDER_BY_DIETS,
        payload,
      });
    };
  };

  export const deleteFilters = () => {
    return (dispatch) => {
      return dispatch({
        type: DELETE_FILTERS,
      });
    };
  };
  
  export const orderByOrigin = (payload) => {
    return (dispatch) => {
      return dispatch({
        type: ORDER_BY_ORIGIN,
        payload,
      });
    };
  };