import React from 'react'
import { useDispatch } from 'react-redux'

import { getRecipes, deleteRecipe } from '../redux/actions'
import Card from './Card'
import styles from '../styles/Cards.module.css'

const Cards = ({ recipes, remove, newLoading }) => {

          const dispatch = useDispatch()
          const removeFunction = e => {
                    dispatch(deleteRecipe({id: e.target.value}))
                    dispatch(getRecipes())
                    newLoading()
          }

  return (
    <div className={styles.container}>
    {recipes.map(recipe => {
          return (
            <Card
              key={recipe.id}
              id={recipe.id}
              image={recipe.image}
              name={recipe.name}
              healthy={recipe.healthy}
              score={recipe.score}
              diets={!recipe.createdInDb ? recipe.diets + ' ' : recipe.diets.map(diet => diet.name).toString().split(", ")}
              dish={recipe.dish}
              sumary={recipe.sumary}
              steps={recipe.steps}
              remove={remove}
              removeFunction={removeFunction}
            />
          );
    })}
    </div>
  )
};

export default Cards
