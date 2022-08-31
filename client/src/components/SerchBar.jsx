import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { serchName } from "../redux/actions";

import styles from "../styles/SerchBar.module.css";

export default function SerchBar({ newLoading, setCurrentPage }) {
  const dispatch = useDispatch();
  const [serch, setSearch] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(serchName(serch));
    newLoading();
    setSearch("");
    setCurrentPage(1); //seteo la pag en 1
  };

  return (
    <div>
      <div className={styles.buscar}>
        <input
          className={styles.input}
          type="text"
          placeholder="Buscar receta..."
          onChange={(e) => handleChange(e)}
        />
        <button
          className={styles.btn}
          type="submit"
          onClick={(e) => handleClick(e)}
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
