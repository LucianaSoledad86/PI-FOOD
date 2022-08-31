import axios from 'axios'

export const GET_RECIPES = 'GET_RECIPES'
export const GET_DIETS = 'GET_DIETS'
export const SERCH_NAME = 'SERCH_NAME'
export const RECIPE_DETAILS = 'RECIPE_DETAILS'
export const POST_NEW_RECIPE = 'POST_NEW_RECIPE'
export const ORDER_NAME = 'ORDER_NAME'
export const ORDER_SCORE = 'ORDER_SCORE'
export const CREATED_OR_NOT = 'CREATED_OR_NOT'
export const FILTER_DIETS = "FILTER_DIETS"

export const getRecipes = () => async (dispatch) => {
  try {
       const recipes = await axios.get("http://localhost:3001/recipes");
       return dispatch({
         type: GET_RECIPES,
         payload: recipes.data,
       });
  } catch (error) {
    console.log(error)
  }
};

export const getDiets = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/diets");
      //console.log(data, "dataa");
      return dispatch({
        type: GET_DIETS,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const serchName = (name) => async (dispatch) => {
          try {
                  const response = await axios.get(`http://localhost:3001/recipes?name=${name}`)
          
          return dispatch({
                  type: SERCH_NAME,
                  payload: response.data,
})
}         catch (error) {
                  alert("Receta no encontrada");
          return {
                  type: SERCH_NAME,
                  payload: error
          }
}
};

export const recipeDetails = (id) => async dispatch => {
          try {
              const response = await axios.get(`http://localhost:3001/recipes/${id}`) 
              return dispatch({
                    type: RECIPE_DETAILS,
                    payload: response.data
              })     
          } catch (error) {
                    console.log(error)        
          }
};

export const orderName = (payload) => {
          return {
                    type: ORDER_NAME,
                    payload,
          }
};

export const orderScore = (payload) => {
          return {
                    type: ORDER_SCORE,
                    payload
          }
};

export const createdOrNot = (payload) => {
  return {
    type: CREATED_OR_NOT,
    payload
  };
};

export const filterDiets = (payload) => {
          return {
                    type: FILTER_DIETS,
                    payload
          }
};

export const postNewRecipe = (payload) => async (dispatch) => {
  try {
     const response = await axios.post("http://localhost:3001/recipes",payload);
     //console.log(response)
     return response;
  } catch (error) {
    console.log(error)
  }
 
};

export const deleteRecipe = (payload) => async (dispatch) => {
  try {
    return await axios.delete("http://localhost:3001/recipes", {
      data: payload,
    });
  } catch (error) {
    console.log(error); 
  }       
};


