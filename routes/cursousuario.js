"use strict";

/* Rutas dedicadas al cursousuario */
const { Router } = require("express");
const {
  cursousuarioGetTodo,
  cursousuarioGetUno,
  cursousuarioPost,
  cursousuarioPut,
  cursousuarioPatch,
  cursousuarioDelete,
  cursousuarioNoParamURL,
} = require("../controllers/cursousuario");
const router = Router();

/* Rutas separadas */
// se ha quitado /api y se ha reemplazado por /
// porque la contención que se usó en la llamada lo abarcará
router.get("/uno", cursousuarioGetUno);
router.get("/todo", cursousuarioGetTodo);

router.post("/", cursousuarioPost);

/* Trabajando con parámetros de segmento */
// para que acepte esta url "127.0.0.1:8089/api/cursousuarios/10"
router.put("/:cursousuario", cursousuarioPut);
// esta ruta capturará el error de no establecer un id de cursousuario
router.put("/", cursousuarioNoParamURL);

router.patch("/", cursousuarioPatch);

router.delete("/", cursousuarioDelete);

router.get("/public", (req, res) => {
  res.send("Hello World");
});

module.exports = router;
