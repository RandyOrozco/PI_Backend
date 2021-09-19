"use strict";

/* Rutas dedicadas al publicacion */
const { Router } = require("express");
const {
  publicacionGetTodo,
  publicacionGetUno,
  publicacionPost,
  publicacionPut,
  publicacionPatch,
  publicacionDelete,
  publicacionNoParamURL,
} = require("../controllers/publicacion");
const router = Router();

/* Rutas separadas */
// se ha quitado /api y se ha reemplazado por /
// porque la contención que se usó en la llamada lo abarcará
router.get("/uno", publicacionGetUno);
router.get("/todo", publicacionGetTodo);

router.post("/", publicacionPost);

/* Trabajando con parámetros de segmento */
// para que acepte esta url "127.0.0.1:8089/api/publicacions/10"
router.put("/:publicacion", publicacionPut);
// esta ruta capturará el error de no establecer un id de publicacion
router.put("/", publicacionNoParamURL);

router.patch("/", publicacionPatch);

router.delete("/", publicacionDelete);

router.get("/public", (req, res) => {
  res.send("Hello World");
});

module.exports = router;
