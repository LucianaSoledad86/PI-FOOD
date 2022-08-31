const { Recipe, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Recipe model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("Validadores", () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe("name", () => {
      it("debería arrojar un error si 'name' es nulo", (done) => {
        Recipe.create({})
          .then(() => done(new Error("Requiere un 'name' válido")))
          .catch(() => done());
      });
      it("debería funcionar cuando 'name' es válido", () => {
        Recipe.create({
          name: "Choripan",
        });
      });

      describe("healthy", () => {
        it("debería arrojar un error si 'healthy' es nulo", (done) => {
          Recipe.create({
            name: "Asado",
            score: 10,
          })
            .then(() => done(new Error("'healthy' es requerido")))
            .catch(() => done());
        });
      });

      describe("score", () => {
        it("debería arrojar un error si 'score' no es el tipo de dato INTEGER", (done) => {
          Recipe.create({
            name: "Locro",
            score: "8",
          })
            .then(() => done(new Error("Score es un valor incorrecto")))
            .catch(() => done());
        });
      });

      describe("createdInDb", () => {
        it("debería arrojar un error si 'createdInDb' no es el booleano", (done) => {
          Recipe.create({
            name: "Ensalada Vegana",
            score: 6,
            healthy: 10,
            createdInDB: "Receta creada",
          })
            .then(() => done(new Error("createdInDb es un valor incorrecto")))
            .catch(() => done());
        });
      });
    });
  });
});
