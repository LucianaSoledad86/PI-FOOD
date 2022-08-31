import React from 'react'
import { Link } from 'react-router-dom'

import styles from '../styles/Card.module.css'

const Card = ({id, name, diets, image, remove, removeFunction}) => {

  return (
    <div className={styles.container}>
      {remove && (
        <button
          name="id"
          value={id}
          onClick={(e) => removeFunction(e)}
          className={styles.remove}
        > X </button>
      )}
      <Link to={`/recipes/${id}`} className={styles.link}>
        <img
          src={image}
          alt="Imagen Receta"
          className={styles.img}
          width={280}
          height={200}
        />
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.dietasDiv}>
          <h5 className={styles.parrafo}> TIPOS DE DIETAS </h5>
          <li className={styles.text}>{diets}</li>
        </div>
      </Link>
    </div>
  );
}

export default Card
