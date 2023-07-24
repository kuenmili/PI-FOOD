const validation = (recipeData) => {
    const errors = {};
    
    if(!recipeData.title){ 
        errors.title = 'Name is required';
    }
    if(recipeData.title.length < 3){
        errors.title = 'The name must have more than 3 words long'
    }
    if(recipeData.title.length > 20){
        errors.title = 'The name must have less than 20 words long'
    }
    if(!recipeData.healthScore) {
        errors.healthScore = 'Health Score is required'
    }
    if(recipeData.healthScore < 0 || recipeData.healthScore > 120){
        errors.healthScore = "Health Score must be between 1 and 120"
    }
    if(!recipeData.summary) {
        errors.summary = 'Summary is required'
    }
    if(!recipeData.image) {
        errors.image = 'Link is required'
    }
    if(!recipeData.image.includes('https://')) {
        errors.image = 'Must be a link to an image'
    }
    if(!recipeData.steps) {
        errors.steps = 'Steps are required'
    }
    
    return errors;
}

export default validation;