"use strict";

/* Rutas dedicadas al curso */
const { Router } = require("express");
const {
  cursoGetTodo,
  cursoGetUno,
  cursoPost,
  cursoPut,
  cursoPatch,
  cursoDelete,
  cursoNoParamURL,
} = require("../controllers/curso");
const router = Router();

/* Rutas separadas */
// se ha quitado /api y se ha reemplazado por /
// porque la contención que se usó en la llamada lo abarcará
router.get("/uno", cursoGetUno);
router.get("/todo", cursoGetTodo);

router.post("/", cursoPost);

/* Trabajando con parámetros de segmento */
// para que acepte esta url "127.0.0.1:8089/api/cursos/10"
router.put("/:curso", cursoPut);
// esta ruta capturará el error de no establecer un id de curso
router.put("/", cursoNoParamURL);

router.patch("/", cursoPatch);

router.delete("/", cursoDelete);

router.get("/public", (req, res) => {
  res.send("Hello World");
});

module.exports = router;
