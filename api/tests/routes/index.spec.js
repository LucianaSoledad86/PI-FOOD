/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Recipe, conn } = require("../../src/db.js");

const agent = session(app);
const recipe = {
  name: "Milanea a la napolitana",
  sumary:
    "Bife de pollo rebozado. Frito y cubierto de salsa de tomate y queso derretido",
  score: 10,
};

describe("Recipe routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Recipe.sync({ force: true }).then(() => Recipe.create(recipe))
  );

  describe("GET /recipes/:id", () => {
    it("debe responder con .status(200) cuando no se encuentra la identificación", () => {
      agent.get("/recipes/716426").expect(200);
    });

    it("debe responder con .status(400) cuando no se encuentra la identificación de la receta", () => {
      agent.get("/recipes/i").expect(400);
    });
  });
});
