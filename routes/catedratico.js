"use strict";

/* Rutas dedicadas al catedratico */
const { Router } = require("express");
const {
  catedraticoGetTodo,
  catedraticoGetUno,
  catedraticoPost,
  catedraticoPut,
  catedraticoPatch,
  catedraticoDelete,
  catedraticoNoParamURL,
} = require("../controllers/catedratico");
const router = Router();

/* Rutas separadas */
// se ha quitado /api y se ha reemplazado por /
// porque la contención que se usó en la llamada lo abarcará
router.get("/uno", catedraticoGetUno);
router.get("/todo", catedraticoGetTodo);

router.post("/", catedraticoPost);

/* Trabajando con parámetros de segmento */
// para que acepte esta url "127.0.0.1:8089/api/catedraticos/10"
router.put("/:catedratico", catedraticoPut);
// esta ruta capturará el error de no establecer un id de catedratico
router.put("/", catedraticoNoParamURL);

router.patch("/", catedraticoPatch);

router.delete("/", catedraticoDelete);

router.get("/public", (req, res) => {
  res.send("Hello World");
});

module.exports = router;
