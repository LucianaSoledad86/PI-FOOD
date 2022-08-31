const { Router } = require('express');
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;


const router = Router();
module.exports = router;


const getInfoApi = async () => {
  let recipesApi = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=20&addRecipeInformation=true`
  );
  // console.log(recipe, 'info API')

  const apiInfo = await recipesApi.data.results.map((response) => {
    return {
      id: response.id,
      name: response.title,
      sumary: response.summary
        ? response.summary.replace(/<[^>]*>?/gm, "")
        : "",
      score: response.healthScore,
      healthy: response.healthScore,
      diets: response.diets.map((response) => response),
      steps:
        response.analyzedInstructions[0] &&
        response.analyzedInstructions[0].steps
          ? response.analyzedInstructions[0].steps.map((i) => i.step).join(", ")
          : "",
      image: response.image,
      dish: response.dishTypes.map((response) => response),
    };
  });
  return apiInfo;
};

const getInfoDb = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attibutes: [],
      },
    },
  });
};

const allRecipes = async () => {
  const allRecipesApi = await getInfoApi();
  const allRecipesDb = await getInfoDb();
  const allInfo = [...allRecipesApi, ...allRecipesDb];

  return allInfo;
};

//RUTAS RECETAS
router.get("/recipes", async (req, res) => {
  const { name } = req.query;
  allRecipes().then((recipes) => {
    if (name) {
      let recipe = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(name.toLowerCase())
      );

      recipe.length
        ? res.status(200).send(recipe)
        : res.status(400).send("Receta no encontrada");
      console.log(recipes)
    } else {
      res.status(200).send(recipes);
    }
  });
});

//RUTA DIETAS
router.get("/diets", async (req, res) => {
  
const infoApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)

  const dietsApi = await infoApi.data.results.map((diet) => {
    return {
      diets: diet.diets.map((diet) => diet),
    };
  });

  const mapped = dietsApi.map((d) => {
    return d.diets;
  });
  const dietsMap = mapped.toString().split(",");
  // console.log(dietsMap)

  const unique = [...new Set(dietsMap)];
  // console.log(unique);
  const ordered = [...unique].sort();

  ordered.forEach((diet) => {
    if (diet) {
      Diet.findOrCreate({
        where: { name: diet },
      });
    }
  });

  const allDiets = await Diet.findAll();
  res.status(200).send(allDiets);
});

router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  allRecipes().then((recipe) => {
    if (id) {
      let recetaId = recipe.filter((r) => r.id == id);
      recetaId.length
        ? res.status(200).send(recetaId)
        : res.status(400).send("La receta no existe");
    }
  });
});

router.post("/recipes", async (req, res) => {
  let { name, sumary, score, healthy, diets, steps, image, dish, createdInDb } = req.body;

  let newRecipe = await Recipe.create({
    name,
    sumary,
    score,
    healthy,
    steps,
    image,
    dish,
    createdInDb,
  });

  const unique = [...new Set(diets)];

  unique.map(async (diet) => {
    // console.log("diet", diet);

    const dietDb = await Diet.findAll({
      where: { name: diet },
      include: [Recipe],
    });

    newRecipe.addDiet(dietDb)
  });

  res.send("Receta creada con exito");
});

router.delete("/recipes", async (req, res) => {
  try {
    const { id } = req.body;
    await Recipe.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("Receta eliminada");
  } catch (error) {
    console.log(error);
    res.status(400).send("No se encontró receta");
  }
});


