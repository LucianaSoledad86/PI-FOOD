import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { getRecipes, getDiets, deleteDetails } from "../redux/actions";

import Filter from './Filter'
import Spinner from './Spinner'
import SerchBar from './SerchBar'
import Paginado from './Paginado'
import Cards from './Cards'

import styles from '../styles/Home.module.css'

const Home = () => {

            const dispatch = useDispatch();

            let recipes = useSelector((state) => state.recipes);
            let diets = useSelector((state) => state.diets);

            const [orderName, setOrderName] = useState("");
            const [orderScore, setOrderScore] = useState("");
            const [loading, setLoading] = useState(false);

            const [currentPage, setCurrentPage] = useState(1);
            const [recipePerpage, setRecipePerpage] = useState(9);

            let indexOfLastDRecipe = currentPage * recipePerpage;
            let indexOfFirstRecipe = indexOfLastDRecipe - recipePerpage;
            
            let currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastDRecipe);

            const paged = (numPage) => {
              setCurrentPage(numPage);
            };

            const newLoading = () => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 1500);
            };

            useEffect(() => {
              dispatch(getRecipes());
              dispatch(getDiets());
              dispatch(deleteDetails())
              newLoading();
            }, []);

            const handleClick = (e) => {
              e.preventDefault();
              dispatch(getRecipes());
              newLoading();
            };


  return (
    <div className={styles.home}>
      <button className={styles.btnvolver}>
        <Link className={styles.link} to="/">
          Volver
        </Link>
      </button>

      {recipes.length || !loading ? (
        <div>
          <div className={styles.container}>
            <Filter
              setOrderScore={setOrderScore}
              setOrderName={setOrderName}
              diets={diets}
              paged={paged}
              setCurrentPage={setCurrentPage}
            />

      <button className={styles.button}> <Link className={styles.link} to="/create"> CREAR RECETA </Link> </button>

            <button className={styles.button} onClick={(e) => handleClick(e)}> Actualizar </button>

            <Paginado
              recipes={recipes.length}
              recipePerpage={recipePerpage}
              paged={paged}
            />
          </div>
          <SerchBar
            newLoading={newLoading}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            paged={paged}
          />

          <div>
            {loading || !currentRecipes.length ? (
              <div>
                <Spinner />
              </div>
            ) : (
              <Cards recipes={currentRecipes} />
            )}
          </div>

          {!recipes.length && (
            <h1 className={styles.noDogs}> Receta no encontrada </h1>
          )}
        </div>
      ) : (
        <div>
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default Home
