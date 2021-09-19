"use strict";

/* Usando clases para levantar el servidor usando Express */
const Server = require("./models/server");
const server = new Server();
server.listen();
