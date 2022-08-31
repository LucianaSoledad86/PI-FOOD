import {
  GET_RECIPES,
  GET_DIETS,
  SERCH_NAME,
  RECIPE_DETAILS,
  POST_NEW_RECIPE,
  ORDER_NAME,
  ORDER_SCORE,
  CREATED_OR_NOT,
  FILTER_DIETS,
} from "./actions";

const initialState = {
          recipes: [],
          allRecipes: [],
          diets: [],
          details: []
}

export const Reducer = (state = initialState, action) => {
          switch (action.type){
          case GET_RECIPES:
                    return{
                              ...state,
                              recipes: action.payload,
                              allRecipes: action.payload
                    };

          case GET_DIETS:
                    return{
                              ...state,
                              diets: action.payload
                    };

          case SERCH_NAME:
                    return{
                              ...state,
                              recipes: action.payload
                    };

          case RECIPE_DETAILS:
                    return{
                              ...state,
                              details: action.payload
                    };

          case POST_NEW_RECIPE:
                    return{
                      ...state,
                    }

          case ORDER_NAME:
                    const orderName =
                    action.payload === 'Asc'
                    ? state.recipes.sort((a, b) => {
                              if (a.name > b.name) return 1
                              if (b.name > a.name) return -1
                              return 0;
                    })
                    : state.recipes.sort((a, b) => {
                              if (a.name > b.name) return -1
                              if (b.name > a.name) return 1
                              return 0;
                    })
                    return {
                              ...state,
                              recipes: orderName
                    }
          
          case ORDER_SCORE:
                    let scoreOrder;

                    if (action.payload === 'Asc') {

                              scoreOrder = state.recipes.sort((a, b) => {
                                        if (a.score > b.score) return 1
                                        if (a.score < b.score) return -1
                                        return 0
                              });
                    } else if (action.payload === 'Desc') {
                              scoreOrder = state.recipes.sort((a, b) => {
                                        if (a.score > b.score) return -1
                                        if (a.score < b.score) return 1
                                        return 0
                              });
                    } else {
                              scoreOrder = state.allRecipes
                    }
                    return {
                              ...state,
                              recipes: scoreOrder
                    };

          case CREATED_OR_NOT:
                    const createdOrNot =
                    action.payload === 'Created'
                    ? state.allRecipes?.filter(d => d.createdInDb === true)
                    : state.allRecipes?.filter(d => !d.createdInDb)
                    return {
                              ...state,
                              recipes: action.payload === 'All' ? state.allRecipes : createdOrNot
                    };

          case FILTER_DIETS:
                    const { allRecipes } = state

                    const dietsFilter = 
                    action.payload === 'All'
                    ? allRecipes
                    : allRecipes.filter(diet => 
                              diet.diets?.includes(action.payload) || 
                              diet.diets?.find(d => d.name === action.payload))

                    return {
                              ...state,
                              recipes: dietsFilter
                    };

          



          default:
            return state;
          }
};