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
conexion.query("select * from catedratico", function (error, results, fields) {
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

const catedraticoGetUno = (req = request, res = response) => {
  poolMySQL.getConnection(function (err, conn) {
    if (err) {
      res.send("Ha ocurrido un error: " + err);
    } else {
      const { catedratico } = req.query;
      conn.query(
        `select * from catedratico where catedratico=${catedratico}`,
        function (qerr, records, fields) {
          if (qerr) {
            res.send("Ha ocurrido un error en la consulta " + qerr);
          } else {
            res.send(records);
          }
          conn.release();
        }
      );
    }
  });
};

const catedraticoGetTodo = (req = request, res = response) => {
  poolMySQL.getConnection(function (err, conn) {
    if (err) {
      res.send("Ha ocurrido un error: " + err);
    } else {
      conn.query(`select * from catedratico`, function (qerr, records, fields) {
        if (qerr) {
          res.send("Ha ocurrido un error en la consulta " + qerr);
        } else {
          res.send(records);
        }
        conn.release();
      });
    }
  });
};

const catedraticoPost = (req, res) => {
  poolMySQL.getConnection(function (err, conn) {
    if (err) {
      res.send("Ha ocurrido un error: " + err);
    } else {
      const { nombre } = req.body;
      /*console.log(
        `INSERT INTO catedratico ('registroacademico', 'nombre', 'apellido', 'clave', 'email', 'fecha') VALUES ('${registroacademico}','${nombre}','${apellido}','${clave}','${email}',NOW()) `
      );*/
      conn.query(
        `INSERT INTO catedratico (nombre) VALUES ('${nombre}') `,
        function (qerr, records, fields) {
          if (qerr) {
            res.send("Ha ocurrido un error en la consulta " + qerr);
          } else {
            res.send(records);
          }
          conn.release();
        }
      );
    }
  });
};

/* Trabajando con parámetros de segmento */
//de la forma "127.0.0.1:8089/api/catedraticos/10"
//se requiere actualizar el catedratico con id 10
const catedraticoPut = (req, res) => {
  poolMySQL.getConnection(function (err, conn) {
    if (err) {
      res.send("Ha ocurrido un error: " + err);
    } else {
      const catedratico = req.params.catedratico;
      const { nombre } = req.body;
      /*console.log(
        `UPDATE catedratico SET 
        nombre = '${nombre}',
        apellido = '${apellido}', 
        clave = '${clave}', 
        email = '${email}'
        WHERE catedratico = ${catedratico} `
      );*/
      conn.query(
        `UPDATE catedratico SET 
        nombre = '${nombre}'
        WHERE catedratico = ${catedratico} `,
        function (qerr, records, fields) {
          if (qerr) {
            res.send("Ha ocurrido un error en la consulta " + qerr);
          } else {
            res.send(records);
          }
          conn.release();
        }
      );
    }
  });
};

const catedraticoPatch = (req, res) => {
  res.json({
    msg: "patch API - controlador",
  });
};

const catedraticoDelete = (req, res) => {
  res.json({
    msg: "delete API - controlador",
  });
};

/* Respuesta por defecto a una URL incompleta */
// TODO: buscar cómo se establece una respuesta tipo error 400
const catedraticoNoParamURL = (req, res) => {
  res.status(400).json({
    msg: "Debe establecer un parámetro",
  });
};

module.exports = {
  catedraticoGetUno,
  catedraticoGetTodo,
  catedraticoPost,
  catedraticoPut,
  catedraticoPatch,
  catedraticoDelete,
  catedraticoNoParamURL,
};
