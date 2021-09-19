"use strict";

/* Rutas dedicadas al usuario */
const { Router } = require("express");
const {
  usuarioGetTodo,
  usuarioGetUno,
  usuarioPost,
  usuarioPut,
  usuarioPatch,
  usuarioDelete,
  usuarioNoParamURL,
} = require("../controllers/usuario");
const router = Router();

/* Rutas separadas */
// se ha quitado /api y se ha reemplazado por /
// porque la contención que se usó en la llamada lo abarcará
router.get("/uno", usuarioGetUno);
router.get("/todo", usuarioGetTodo);

router.post("/", usuarioPost);

/* Trabajando con parámetros de segmento */
// para que acepte esta url "127.0.0.1:8089/api/usuarios/10"
router.put("/:usuario", usuarioPut);
// esta ruta capturará el error de no establecer un id de usuario
router.put("/", usuarioNoParamURL);

router.patch("/", usuarioPatch);

router.delete("/", usuarioDelete);

router.get("/public", (req, res) => {
  res.send("Hello World");
});

module.exports = router;
