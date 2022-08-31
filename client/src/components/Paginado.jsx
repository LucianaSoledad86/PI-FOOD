import React from "react";

import styles from "../styles/Paginado.module.css";

const Paginado = ({ recipePerpage, recipes, paged, currentPage }) => {
  let numPage = [];
  for (let i = 1; i <= Math.ceil(recipes / recipePerpage); i++) {
    numPage.push(i);
  }

  return (
    <nav>
      <ul className={styles.paged}>
        {numPage.map((i) => (
          <button
            key={i}
            className={i === currentPage ? styles.active : styles.numbers}
            onClick={() => paged(i)}
          >
            {i}
          </button>
        ))}
      </ul>
    </nav>
  );
};

export default Paginado;
