"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { cat } = require("../routes/catedratico");
const { com } = require("../routes/comentario");
const { cur } = require("../routes/curso");
const { curusr } = require("../routes/cursousuario");
const { pub } = require("../routes/publicacion");
const { usr } = require("../routes/usuario");

class Server {
  /* Ruta del api de los modulos */
  catedraticoPath = "/api/catedratico";
  comentarioPath = "/api/comentario";
  cursoPath = "/api/curso";
  cursousuarioPath = "/api/cursousuario";
  publicacionPath = "/api/publicacion";
  usuarioPath = "/api/usuario";

  constructor() {
    this.port = process.env.PORT;
    this.app = express();

    /* CORS */
    this.app.use(cors());

    /* Middlewares */
    this.middlewares();

    // Rutas de la aplicación
    this.routes();
  }

  middlewares() {
    /* CORS */
    this.app.use(cors());

    /* Lectura y parseo del body */
    // cualquier información que venga de un post, put o delete (quizas get)
    // se intentará serializar a un formato JSON
    this.app.use( express.json());

    /* Directorio publico */
    this.app.use(express.static("public"));
  }

  routes() {
    /* Separando las rutas */
    // ahora las rutas están en una archivo aparte
    this.app.use(this.catedraticoPath, require("../routes/catedratico"));
    this.app.use(this.comentarioPath, require("../routes/comentario"));
    this.app.use(this.cursoPath, require("../routes/curso"));
    this.app.use(this.cursousuarioPath, require("../routes/cursousuario"));
    this.app.use(this.publicacionPath, require("../routes/publicacion"));
    this.app.use(this.usuarioPath, require("../routes/usuario"));
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}

module.exports = Server;
