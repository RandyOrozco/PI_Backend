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
conexion.query("select * from curso", function (error, results, fields) {
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

const cursoGetUno = (req = request, res = response) => {
  poolMySQL.getConnection(function (err, conn) {
    if (err) {
      res.send("Ha ocurrido un error: " + err);
    } else {
      const { curso } = req.body;
      conn.query(
        `select cu.*, ca.nombre nombrecatedratico from curso cu left join catedratico ca on cu.catedratico = ca.catedratico where cu.curso=${curso}`,
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

const cursoGetTodo = (req = request, res = response) => {
  poolMySQL.getConnection(function (err, conn) {
    if (err) {
      res.send("Ha ocurrido un error: " + err);
    } else {
      conn.query(`select  cu.*, ca.nombre nombrecatedratico from curso cu left join catedratico ca on cu.catedratico = ca.catedratico `, function (qerr, records, fields) {
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

const cursoPost = (req, res) => {
  poolMySQL.getConnection(function (err, conn) {
    if (err) {
      res.send("Ha ocurrido un error: " + err);
    } else {
      const { catedratico, credito, nombre } = req.body;
      /*console.log(
        `INSERT INTO curso ('registroacademico', 'nombre', 'apellido', 'clave', 'email', 'fecha') VALUES ('${registroacademico}','${nombre}','${apellido}','${clave}','${email}',NOW()) `
      );*/
      conn.query(
        `INSERT INTO curso (catedratico, credito, nombre) VALUES ('${catedratico}','${credito}','${nombre}') `,
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

/* Trabajando con parámetros de segmento */
//de la forma "127.0.0.1:8089/api/cursos/10"
//se requiere actualizar el curso con id 10
const cursoPut = (req, res) => {
  poolMySQL.getConnection(function (err, conn) {
    if (err) {
      res.send("Ha ocurrido un error: " + err);
    } else {
      const curso = req.params.curso;
      const { catedratico, credito, nombre } = req.body;
      /*console.log(
        `UPDATE curso SET 
        nombre = '${nombre}',
        apellido = '${apellido}', 
        clave = '${clave}', 
        email = '${email}'
        WHERE curso = ${curso} `
      );*/
      conn.query(
        `UPDATE curso SET 
        catedratico = '${catedratico}',
        credito = '${credito}', 
        nombre = '${nombre}'
        WHERE curso = ${curso} `,
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

const cursoPatch = (req, res) => {
  res.json({
    msg: "patch API - controlador",
  });
};

const cursoDelete = (req, res) => {
  res.json({
    msg: "delete API - controlador",
  });
};

/* Respuesta por defecto a una URL incompleta */
// TODO: buscar cómo se establece una respuesta tipo error 400
const cursoNoParamURL = (req, res) => {
  res.status(400).json({
    msg: "Debe establecer un parámetro",
  });
};

module.exports = {
  cursoGetUno,
  cursoGetTodo,
  cursoPost,
  cursoPut,
  cursoPatch,
  cursoDelete,
  cursoNoParamURL,
};
