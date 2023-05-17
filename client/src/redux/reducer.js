
import {
    GET_RECIPES,
    GET_DIETS,
    GET_RECIPE_DETAIL    
} from './action-types';

const initialState = {
    recipes: []
}


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
                recipe: payload,
            };
        default:
            return { ...state };
    }
};

export default reducer;