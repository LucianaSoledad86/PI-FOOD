import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"


import { getDiets, postNewRecipe, getRecipes } from "../redux/actions"
import Spinner from './Spinner'
import Cards from './Cards'

import styles from '../styles/Create.module.css'


const Create = () => {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  let crearReceta = useSelector((state) =>
    state.allRecipes.filter((r) => r.createdInDb)
  );

  const unique = [...new Set(diets)];

  const [data, setData] = useState({
    name: "",
    image: "",
    sumary: "",
    healthy: "",
    score: "",
    steps: "",
    diets: [],
    dish: "",
  });

  //Modifico la data
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...data,
        [e.target.name]: e.target.value,
      })
    );
    // console.log(data, "handleChange");
  };

  //Seleccionar Tipos de platos
  const handleRadio = (e) => {
    if (e.target.checked) {
      setData({
        ...data,
        dish: e.target.value,
      });
    }
  };

  //Seleccionar Tipos de dietas
  const handleSelect = (e) => {
    setData({
      ...data,
      diets: [...data.diets, e.target.value],
    });
  };

  //Eliminar recetas creadas
  const handleDelete = (e) => {
    e.preventDefault();
    const filtrarDieta = data.diets.filter((d) => d !== e.target.name);
    setData({
      ...data,
      diets: filtrarDieta,
    });
  };

  //VALIDACIONES
  function validate(data) {
    const errors = {};

    if (!data.name) {
      errors.name = "Nombre requerido";
    }
    if (data.image !== "" &&!/^(ftp|http|https):\/\/[^ "]+$/.test(data.image)) {
      errors.image = "la imagen tiene que ser una Url ejemplo: http://";
    }
    if (data.sumary.length < 1) {
       errors.sumary = "El resumen es obligatorio";
    }
    if (data.healthy < 0 || data.healthy > 100) {
      errors.healthy = "Saludable valido de 0 a 100";
    }
    if (data.score < 0 || data.score > 100) {
      errors.score = "Puntuación valida de 0 a 100";
    }
    if (data.steps.length < 10) {
      errors.steps = "El resumen debe tener al menos 10 caracteres";
    }
    if (!data.dish) {
      errors.dish = "Seleccione tipo de plato";
    }
    if (data.diets?.length === 0) {
      errors.diets = "Seleccione al menos un tipo de dieta";
    }
    return errors;
  }

  const newLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data, "handleSubmit");
    dispatch(postNewRecipe(data));
    alert("Receta creada con éxito");
    setData({
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

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
    newLoading();
  }, []);

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
              value={data.name}
              name="name"
              required={true}
              className={styles.input}
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          <div>
            <label>
              <b>*Imagen url:</b>
            </label>
            <input
              type="text"
              value={data.image}
              name="image"
              required={true}
              className={styles.input}
              onChange={(e) => handleChange(e)}
            />
            {errors.image && <p className={styles.error}>{errors.image}</p>}
          </div>

          <div>
            <label>
              <b>*Resumen del plato</b>
            </label>
            <input
              type="text"
              value={data.sumary}
              name="sumary"
              required={true}
              className={styles.input}
              onChange={(e) => handleChange(e)}
            />
            {errors.sumary && <p className={styles.error}>{errors.sumary}</p>}
          </div>

          <div>
            <label>
              <b>*Nivel de comida "saludable":</b>
            </label>
            <input
              type="number"
              value={data.healthy}
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
              value={data.score}
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
              <b>*Preparación:</b>
            </label>
            <textarea
              value={data.steps}
              name="steps"
              placeholder="Ingrese el paso a paso de la preparación de su receta"
              cols="80"
              rows="6"
              className={styles.input}
              onChange={(e) => handleChange(e)}
            ></textarea>
            {errors.steps && <p className={styles.error}>{errors.steps}</p>}
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
            {errors.dish && <p className={styles.error}>{errors.dish}</p>}
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
            {[...new Set(data.diets)].map((diet) => (
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
