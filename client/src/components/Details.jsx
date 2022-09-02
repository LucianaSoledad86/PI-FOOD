import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { recipeDetails } from '../redux/actions'
import Spinner from './Spinner'

import styles from '../styles/Details.module.css'

const Details = () => {

          const dispatch = useDispatch()
          const { id } = useParams()
          const [ loading, setLoading ] = useState(false)

          useEffect(() => {
                    dispatch(recipeDetails(id))
                    setLoading(true)
                    setTimeout(() => {
                              setLoading(false)
                    }, 1000)
          }, [])

          let recipe = useSelector(state => state.details)
          console.log(recipe)

  return (
    <div className={styles.fondo}>
      <button className={styles.button}>
        <Link className={styles.link} to="/home">
          Volver
        </Link>
      </button>
      {loading || !recipe.length ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.table_details}>
            <div className={styles.grid}>
              <img
                className={styles.img}
                src={recipe[0].image}
                alt={"Imagen no encontrada"}
              />
              <div className={styles.titulado}>
                <h1>{recipe[0].name}</h1>
                <span>
                  <b className={styles.titulo}> Nivel de comida saludable: </b>
                  {recipe[0].healthy}
                </span>
                <span>
                  <b className={styles.titulo}> Puntuación: </b>
                  {recipe[0].score}
                </span>
              </div>

              <div className={styles.summary_div}>
                <b className={styles.titulo}> Resumen: </b>
                <p>{recipe[0].sumary}</p>
                <hr />

                <b>CHEF:</b>
                <p>{recipe[0].chef}</p>

                <b className={styles.tituloType}>Tipos de DIETA:</b>
                <li>
                  {!recipe[0].createdInDb
                    ? recipe[0].diets + " "
                    : recipe[0].diets.map((diet) => diet.name + " ")}
                </li>

                <hr />
                <b className={styles.tituloType}> Tipos de PLATO: </b>
                <li>{recipe[0].dish}</li>

                <hr />
                <b className={styles.titulo}>Paso a Paso:</b>
                <p>{recipe[0].steps}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details
