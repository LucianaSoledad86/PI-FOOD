import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"


import { getDiets, postNewRecipe, getRecipes } from "../redux/actions"
import Spinner from './Spinner'
import Cards from './Cards'

import styles from '../styles/Create.module.css'


const Create = () => {
  const dispatch = useDispatch()
  const diets = useSelector((state) => state.diets)
   const [loading, setLoading] = useState(false)
   const [errors, setErrors] = useState({})

  let crearReceta = useSelector((state) =>state.allRecipes.filter((r) => r.createdInDb))

  const unique = [...new Set(diets)];

  const [state, setState] = useState({
    name: "",
    image: "",
    sumary: "",
    healthy: "",
    score: "",
    steps: "",
    diets: [],
    dish: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...state,
        [e.target.name]: e.target.value,
      })
    );
    console.log(state, "handleChange");
  };

  const handleRadio = (e) => {
    if (e.target.checked) {
      setState({
        ...state,
        dish: e.target.value,
      });
    }
  };

  //Seleccionar Dietas
  const handleSelect = (e) => {
    setState({
      ...state,
      diets: [...state.diets, e.target.value],
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const filtrarDieta = state.diets.filter((d) => d !== e.target.name);
    setState({
      ...state,
      diets: filtrarDieta,
    });
  };

  //VALIDACIONES
  function validate(state) {
    const errors = {};

    if (!state.name) {
      errors.name = "Nombre requerido";
    }
    if (state.score < 0 || state.score > 100) {
      errors.score = "Puntuación valida de 0 a 100";
    }
    if (state.healthy < 0 || state.healthy > 100) {
      errors.healthy = "Saludable valido de 0 a 100";
    }
    if (!state.dish) {
      errors.dish = "Seleccione tipo de plato";
    }
    if (state.diets?.length === 0) {
      errors.diets = "Seleccione al menos un tipo de dieta";
    }
    return errors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state, "handleSubmit");
    dispatch(postNewRecipe(state));
    alert("Receta creada con éxito");
    setState({
      name: "",
      image: "",
      sumary: "",
      healthy: "",
      score: "",
      steps: "",
      diets: [],
      dish: "",
    });
    newLoading();
    dispatch(getRecipes());
  };

  const newLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  };

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
    newLoading();
  },[]);

  return (
    <div className={styles.fondo}>
      <nav className={styles.nav}>
        <button className={styles.button}>
          <Link className={styles.link} to="/home">
            Volver
          </Link>
        </button>
      </nav>
      <div className={styles.container}>
        <h2>Crear Nueva Receta</h2>
        <hr />

        <form className={styles.formulario} onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>
              <b>*Nombre</b>
            </label>
            <input
              type="text"
              value={state.name}
              name="name"
              required={true}
              className={styles.input}
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          <div>
            <label>
              <b>Imagen url:</b>
            </label>
            <input
              type="text"
              value={state.image}
              name="image"
              required={true}
              className={styles.input}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <label>
              <b>Resumen del plato</b>
            </label>
            <input
              type="text"
              value={state.sumary}
              name="sumary"
              required={true}
              className={styles.input}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <label>
              <b>*Nivel de comida "saludable":</b>
            </label>
            <input
              type="number"
              value={state.healthy}
              name="healthy"
              placeholder="0-100"
              required={true}
              className={styles.input}
              onChange={(e) => handleChange(e)}
            />
            {errors.healthy && <p className={styles.error}>{errors.healthy}</p>}
          </div>

          <div>
            <labe>
              <b>*Puntuación</b>
            </labe>
            <input
              type="number"
              value={state.score}
              name="score"
              placeholder="0-100"
              required={true}
              className={styles.input}
              onChange={(e) => handleChange(e)}
            />
            {errors.score && <p className={styles.error}>{errors.score}</p>}
          </div>

          <div>
            <label className={styles.label}>
              <b>Preparación:</b>
            </label>
            <textarea
              value={state.steps}
              name="steps"
              placeholder="Ingrese el paso a paso de la preparación de su receta"
              cols="80"
              rows="6"
              className={styles.input}
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>

          <div>
            <div>
              <label className={styles.dish}>
                <b>*Tipos de PLATOS:</b>
              </label>
            </div>
            <label>
              <input
                type="radio"
                name="dish"
                value="morning meal"
                className={styles.radio}
                onChange={(e) => handleRadio(e)}
              />
              Morning meal
            </label>
            <label>
              <input
                type="radio"
                name="dish"
                value="brunch"
                className={styles.radio}
                onChange={(e) => handleRadio(e)}
              />
              Brunch
            </label>
            <label>
              <input
                type="radio"
                name="dish"
                value="breakfast"
                className={styles.radio}
                onChange={(e) => handleRadio(e)}
              />
              Breakfast
            </label>
            <label>
              <input
                type="radio"
                name="dish"
                value="side dish"
                className={styles.radio}
                onChange={(e) => handleRadio(e)}
              />
              Side dish
            </label>
            <label>
              <input
                type="radio"
                name="dish"
                value="soup"
                className={styles.radio}
                onChange={(e) => handleRadio(e)}
              />
              Soup
            </label>
            <label>
              <input
                type="radio"
                name="dish"
                value="lunch"
                className={styles.radio}
                onChange={(e) => handleRadio(e)}
              />
              Lunch
            </label>
            <label>
              <input
                type="radio"
                name="dish"
                value="main course"
                className={styles.radio}
                onChange={(e) => handleRadio(e)}
              />
              Main course
            </label>
            <label>
              <input
                type="radio"
                name="dish"
                value="main dish"
                className={styles.radio}
                onChange={(e) => handleRadio(e)}
              />
              Main dish
            </label>
            <label>
              <input
                type="radio"
                name="dish"
                value="dinner"
                className={styles.radio}
                onChange={(e) => handleRadio(e)}
              />
              Dinner
            </label>
            <label>
              <input
                type="radio"
                name="dish"
                value="salad"
                className={styles.radio}
                onChange={(e) => handleRadio(e)}
              />
              Salad
            </label>
          </div>

          <div className={styles.list}>
            <labe>
              <b>Tipos de DIETAS:</b>
            </labe>
            <select className={styles.input} onChange={(e) => handleSelect(e)}>
              <option>Seleccionar opción</option>
              {diets.map((diet) => (
                <option value={diet.name}>{diet.name}</option>
              ))}
            </select>
            {errors.diets && <p className={styles.error}>{errors.diets}</p>}
          </div>

          <hr />
          <button className={styles.button} type="submit">
            CONFIRMA
          </button>
        </form>

        <div>
          <div>
            {[...new Set(state.diets)].map((diet) => (
              <div>
                <button
                  key={diet}
                  name={diet}
                  className={styles.remove}
                  onClick={(e) => handleDelete(e)}
                >
                  {diet}
                </button>
              </div>
            ))}
          </div>
        </div>

        <label className={styles.required}>*campos requeridos</label>

        <div>
          {loading ? (
            <Spinner />
          ) : crearReceta.length ? (
            <Cards
              newLoading={newLoading}
              recipes={crearReceta}
              remove={true}
            />
          ) : (
            <div>
              <p>Receta no creada</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Create
