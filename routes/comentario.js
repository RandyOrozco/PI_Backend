"use strict";

/* Rutas dedicadas al comentario */
const { Router } = require("express");
const {
  comentarioGetTodo,
  comentarioGetUno,
  comentarioPost,
  comentarioPut,
  comentarioPatch,
  comentarioDelete,
  comentarioNoParamURL,
} = require("../controllers/comentario");
const router = Router();

/* Rutas separadas */
// se ha quitado /api y se ha reemplazado por /
// porque la contención que se usó en la llamada lo abarcará
router.get("/uno", comentarioGetUno);
router.get("/todo", comentarioGetTodo);

router.post("/", comentarioPost);

/* Trabajando con parámetros de segmento */
// para que acepte esta url "127.0.0.1:8089/api/comentarios/10"
router.put("/:comentario", comentarioPut);
// esta ruta capturará el error de no establecer un id de comentario
router.put("/", comentarioNoParamURL);

router.patch("/", comentarioPatch);

router.delete("/", comentarioDelete);

router.get("/public", (req, res) => {
  res.send("Hello World");
});

module.exports = router;
