import React from 'react'
import { useDispatch } from 'react-redux'

import {
  createdOrNot,
  filterDiets,
  orderName,
  orderScore,
} from "../redux/actions";

import styles from '../styles/Filter.module.css'

const Filter = ({ diets, setCurrentPage, setOrderScore, setOrderName }) => {

const dispatch = useDispatch()

 const handleCreatedOrNot = (e) => {
  dispatch(createdOrNot(e.target.value));
  setCurrentPage(1);
 };

const handleFilterDiets = e => {
  dispatch(filterDiets(e.target.value));
  setCurrentPage(1)
  // console.log(diets)
};

const handleOrderName = (e) => {
  dispatch(orderName(e.target.value));
  setCurrentPage(1);
  setOrderName(`Ordered: ${e.target.value}`);
};

const handleOrderScore = (e) => {
  dispatch(orderScore(e.target.value));
  setCurrentPage(1);
  setOrderScore(`Ordered: ${e.target.value}`);
  };




  return (
    <div>
      <h3 className={styles.title}>Filtrado:</h3>

      <div>
        <select onChange={(e) => handleCreatedOrNot(e)} className={styles.filter}>
          
        <option value=""> Filtro por origen  </option>
          <option  value="All">Todas </option>
          <option  value="Created"> Creadas </option>
          <option  value="Real"> Existentes </option>

        </select>

        <select onChange={(e) => handleFilterDiets(e)} className={styles.filter}>

        <option value=""> Filtro por tipo de DIETA </option>

          <option value="All">Todos</option> 
          {diets.map((diet, index) => (<option  key={index} value={diet.name}> {diet.name} </option>))}

        </select>

      </div>

      <h3 className={styles.title}>Ordenamiento:</h3>

      <div>
        <select onChange={(e) => handleOrderName(e)} className={styles.filter}>

        <option value=""> Ordenar por nombre </option>

          <option value="Asc"> Ascendente </option>
          <option value="Desc"> Descendente </option>

        </select>

        <select onChange={(e) => handleOrderScore(e)} className={styles.filter}>

        <option value=""> Ordenar por puntuación </option>
          
        <option value="Asc"> Ascendente </option>
        <option value="Desc"> Descendente </option>
        
        </select>
      </div>
    </div>
  );
}

export default Filter