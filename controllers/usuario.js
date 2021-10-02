"use strict";
//require("dotenv").config();
//desestructurando lo que viene de express
const { response, request } = require("express");

const mysql = require("mysql");

const poolMySQL = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MY_SQL_HOST,
  database: process.env.MY_SQL_DATABASE,
  user: process.env.MY_SQL_USER,
  password: process.env.MY_SQL_PASSWORD,
  port: process.env.MY_SQL_PORT,
});

/*function conexionCrear() {
  conexionDetener();
  conexion.connect(function (error) {
    if (error) {
      //conexionDetener();
      throw error;
    } else {
      console.log(
        "¡Conexión con el servidor de base de datos MySQL creada con éxito!"
      );
    }
  });
}

function conexionDetener() {
  console.log("Conexión detenida");
  conexion.end();
}*/

/*conexionCrear();
conexion.query("select * from usuario", function (error, results, fields) {
  if (error) {
    throw error;
  }

  results.forEach((result) => {
    console.log(result);
  });
  //console.log(fields);
  conexionDetener();
});*/

/* Seprando la funcionalidad del API */
// Básicamente contendrá todos los callback

const usuarioGetUno = (req = request, res = response) => {
  poolMySQL.getConnection(function (err, conn) {
    if (err) {
      res.send("Ha ocurrido un error: " + err);
    } else {
      const { usuario } = req.query;
      const q = `select * from usuario where usuario='${usuario}'`;
      console.log(q);
      conn.query(
        q,
        function (qerr, records, fields) {
          if (qerr) {
            res.status(500).send("Ha ocurrido un error en la consulta " + qerr);
          } else {
            res.send(records);
          }
          conn.release();
        }
      );
    }
  });
};

const usuarioGetTodo = (req = request, res = response) => {
  poolMySQL.getConnection(function (err, conn) {
    if (err) {
      res.send("Ha ocurrido un error: " + err);
    } else {
      conn.query(`select * from usuario`, function (qerr, records, fields) {
        if (qerr) {
          res.status(500).send("Ha ocurrido un error en la consulta " + qerr);
        } else {
          res.send(records);
        }
        conn.release();
      });
    }
  });
};

const usuarioLogin = (req = request, res = response) => {
  poolMySQL.getConnection(function (err, conn) {
    if (err) {
      res.send("Ha ocurrido un error: " + err);
    } else {
      const { registroacademico, clave } = req.body;
      //console.log(registroacademico);
      //console.log(clave);
      const q = `select usuario from usuario where registroacademico='${registroacademico}' and clave='${clave}'`;
      console.log(q);
      conn.query(q, function (qerr, records, fields) {
        if (qerr) {
          res.status(500).send("Ha ocurrido un error en la consulta " + qerr);
        } else if (records) {
          records.forEach((e) => {
            console.log("ra");
            console.log(e.usuario);
            if (e.usuario != null) {
              console.log("login exitoso");
              res.status(200).send(e);
              res.end();
            } 
            /*else {
              console.log("login fallidoa");
              res.send(null);
            }*/
          });
        } /*else {
          console.log("login fallidob");
          res.send(null);
        }*/
        conn.release();
        /*console.log("login fallidoc");
        res.send(null);*/
      });
    }
  });
};

const usuarioPost = (req, res) => {
  poolMySQL.getConnection(function (err, conn) {
    if (err) {
      res.send("Ha ocurrido un error: " + err);
    } else {
      const { registroacademico, nombre, apellido, clave, email } = req.body;
      /*console.log(
        `INSERT INTO usuario ('registroacademico', 'nombre', 'apellido', 'clave', 'email', 'fecha') VALUES ('${registroacademico}','${nombre}','${apellido}','${clave}','${email}',NOW()) `
      );*/
      const q = `INSERT INTO usuario (registroacademico, nombre, apellido, clave, email, fecha) VALUES ('${registroacademico}','${nombre}','${apellido}','${clave}','${email}',NOW()) `;
      console.log(q);
      conn.query(q, function (qerr, records, fields) {
        if (qerr) {
          res.status(500).send("Ha ocurrido un error en la consulta " + qerr);
        } else {
          res.send(records);
        }
        conn.release();
      });
    }
  });
};

/* Trabajando con parámetros de segmento */
//de la forma "127.0.0.1:8089/api/usuarios/10"
//se requiere actualizar el usuario con id 10
const usuarioPut = (req, res) => {
  poolMySQL.getConnection(function (err, conn) {
    if (err) {
      res.status(500).send("Ha ocurrido un error: " + err);
    } else {
      const usuario = req.params.usuario;
      const { nombre, apellido, clave, email } = req.body;
      /*console.log(
        `UPDATE usuario SET 
        nombre = '${nombre}',
        apellido = '${apellido}', 
        clave = '${clave}', 
        email = '${email}'
        WHERE usuario = ${usuario} `
      );*/
      conn.query(
        `UPDATE usuario SET 
        nombre = '${nombre}',
        apellido = '${apellido}', 
        clave = '${clave}', 
        email = '${email}'
        WHERE usuario = ${usuario} `,
        function (qerr, records, fields) {
          if (qerr) {
            res.status(500).send("Ha ocurrido un error en la consulta " + qerr);
          } else {
            res.send(records);
          }
          conn.release();
        }
      );
    }
  });
};

const usuarioPatch = (req, res) => {
  res.json({
    msg: "patch API - controlador",
  });
};

const usuarioDelete = (req, res) => {
  res.json({
    msg: "delete API - controlador",
  });
};

/* Respuesta por defecto a una URL incompleta */
const usuarioNoParamURL = (req, res) => {
  res.status(400).json({
    msg: "Debe establecer un parámetro",
  });
};

module.exports = {
  usuarioGetUno,
  usuarioGetTodo,
  usuarioLogin,
  usuarioPost,
  usuarioPut,
  usuarioPatch,
  usuarioDelete,
  usuarioNoParamURL,
};
