import axios from 'axios';
import {     
    GET_DIETS,
    GET_RECIPES,
    GET_RECIPE_DETAIL,
    GET_SORT, 
    GET_SORT_DIET,
    GET_SORT_SCORE,   
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

export const searchRecipe = (recipe) => async (dispatch) => {
    const { data } = await axios.get(`${URL}/recipes?name=${recipe}`);
    dispatch({ type: SEARCH_RECIPE, payload: data });
};

// ORDERS AND FILTERS

export const sortByScore = (data) => (dispatch) => {
    dispatch({ type: GET_SORT_SCORE, payload: data });
};

export const sortByDiet = (data) => (dispatch) => {
    dispatch({ type: GET_SORT_DIET, payload: data });
};

export const sortByName = (data) => (dispatch) => {
    dispatch({ type: GET_SORT, payload: data });
};