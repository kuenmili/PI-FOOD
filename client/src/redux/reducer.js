
import {    
    ORDER_BY_NAME,
    ORDER_BY_DIETS,
    ORDER_BY_HEALTH_SCORE,
    ORDER_BY_ORIGIN,
    SEARCH_RECIPE,
    DELETE_RECIPE,
    CREATE_RECIPE,
    GET_RECIPES,
    GET_DIETS,
    GET_RECIPE_DETAIL,
    DELETE_FILTERS 
} from './action-types';

const initialState = {
  filteredRecipes: [],
    recipes: [],
    detail: {},
    diets: [],      
};

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
      case GET_RECIPES:
        return {
          ...state, recipes: payload
        };
      case GET_DIETS:
        return {
          ...state,
          diets: payload,
        };
      case GET_RECIPE_DETAIL:
        return {
          ...state,
          detail: payload,
        };
      case CREATE_RECIPE:
        return{
          ...state, 
        }
      case DELETE_RECIPE:
        return {
          ...state,
        };
      case DELETE_FILTERS:
        return {
          ...state,
          filteredRecipes: [...state.recipes],
        };                    
      case SEARCH_RECIPE:
        return {
          ...state,
          filteredRecipes: payload
        };
      case ORDER_BY_NAME:
        const byName =
          payload === 'ascendente'
          ? [...state.recipes].sort((a, b) => {
            if (a.title > b.title) return 1;
            if (a.title < b.title) return -1;
            return 0;
          })
          : payload === 'descendente'
          ? [...state.recipes].sort((a, b) => {
            if (a.title > b.title) return -1;
            if (a.title < b.title) return 1;
            return 0;
          })
          : [...state.recipes];
        return {  
          ...state,
          recipes: byName,
        };
      case ORDER_BY_HEALTH_SCORE:
        const byHealtScore =
          payload === 'ascendente'
          ? [...state.recipes].sort((a, b) => {
            if (a.healthScore > b.healthScore) return 1;
            if (a.healthScore < b.healthScore) return -1;
            return 0;
          })
          : payload === 'descendente'
          ? [...state.recipes].sort((a, b) => {
            if (a.healthScore > b.healthScore) return -1;
            if (a.healthScore < b.healthScore) return 1;
            return 0;
          })
          : [...state.recipes];
        return {
          ...state,
          recipes: byHealtScore,
        };
      case ORDER_BY_DIETS:
        const filtrado = state.recipes.filter((elemento) =>
          elemento.diets.some((element) => {
            return element === payload;
          })
        );
        return {
          ...state,
          recipes: filtrado,
        };
      case ORDER_BY_ORIGIN:
        const recipes = state.recipes;
        const sort = payload === 'DataBase' 
        ? recipes.filter( recipe => recipe.created)
        : recipes.filter(recipe => !recipe.created);      
        return {
          ...state,
          recipes: payload === "All" 
          ? state.recipes
          : sort
        };                
      default:
        return { ...state };
    };
};

export default reducer;