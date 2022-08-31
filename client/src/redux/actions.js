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

//Recetas
export const getRecipes = () => async (dispatch) => {
  try {
       const recipes = await axios.get("https://pifood-luciana.herokuapp.com/recipes")
       return dispatch({
         type: GET_RECIPES,
         payload: recipes.data,
       });
  } catch (error) {
    console.log(error)
  }
};

//Dietas
export const getDiets = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("https://pifood-luciana.herokuapp.com/diets");
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

//Busqueda por nombre
export const serchName = (name) => async (dispatch) => {
          try {
                  const response = await axios.get(`https://pifood-luciana.herokuapp.com/recipes?name=${name}`)
          
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

//Detalles
export const recipeDetails = (id) => async dispatch => {
          try {
              const response = await axios.get(`https://pifood-luciana.herokuapp.com/recipes/${id}`) 
              return dispatch({
                    type: RECIPE_DETAILS,
                    payload: response.data
              })     
          } catch (error) {
                    console.log(error)        
          }
};

//Ordenamiento por nombre
export const orderName = (payload) => {
          return {
                    type: ORDER_NAME,
                    payload,
          }
};

//Ordenamiento por puntuación
export const orderScore = (payload) => {
          return {
                    type: ORDER_SCORE,
                    payload
          }
};

//Filtrado por creado o existente
export const createdOrNot = (payload) => {
  return {
    type: CREATED_OR_NOT,
    payload
  };
};

//filtrar por tipo de dietas
export const filterDiets = (payload) => {
          return {
                    type: FILTER_DIETS,
                    payload
          }
};

//Creación nva. receta
export const postNewRecipe = (payload) => async (dispatch) => {
  try {
     const response = await axios.post("https://pifood-luciana.herokuapp.com/recipes",payload);
     //console.log(response)
     return response;
  } catch (error) {
    console.log(error)
  }
 
};

//Eliminar receta creada
export const deleteRecipe = (payload) => async (dispatch) => {
  try {
    return await axios.delete("https://pifood-luciana.herokuapp.com/recipes", {
      data: payload,
    });
  } catch (error) {
    console.log(error); 
  }       
};


