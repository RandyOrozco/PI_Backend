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
conexion.query("select * from cursousuario", function (error, results, fields) {
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

const cursousuarioGetUno = (req = request, res = response) => {
  poolMySQL.getConnection(function (err, conn) {
    if (err) {
      res.send("Ha ocurrido un error: " + err);
    } else {
      const { usuario } = req.query;
      conn.query(
        //"select cu.curso, cu.nombre nombrecurso, cu.credito, us.* from cursousuario cuus left join curso cu on cuus.curso = cu.curso left join usuario us on cuus.usuario = us.usuario where cuus.usuario = 2"
        `select cu.curso, cu.nombre nombrecurso, cu.credito, us.* 
        from cursousuario cuus left join curso cu on cuus.curso = cu.curso left join usuario us on cuus.usuario = us.usuario 
        where cuus.usuario = ${usuario}`,
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

const cursousuarioGetTodo = (req = request, res = response) => {
  poolMySQL.getConnection(function (err, conn) {
    if (err) {
      res.send("Ha ocurrido un error: " + err);
    } else {
      conn.query(
        `select cu.curso, cu.nombre nombrecurso, cu.credito, us.* 
        from cursousuario cuus left join curso cu on cuus.curso = cu.curso left join usuario us on cuus.usuario = us.usuario`,
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

const cursousuarioPost = (req, res) => {
  poolMySQL.getConnection(function (err, conn) {
    if (err) {
      res.send("Ha ocurrido un error: " + err);
    } else {
      const { curso, usuario } = req.body;
      conn.query(
        `INSERT INTO cursousuario (curso, usuario) VALUES ('${curso}','${usuario}') `,
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
//de la forma "127.0.0.1:8089/api/cursousuarios/10"
//se requiere actualizar el cursousuario con id 10
const cursousuarioPut = (req, res) => {
  poolMySQL.getConnection(function (err, conn) {
    if (err) {
      res.send("Ha ocurrido un error: " + err);
    } else {
      const cursousuario = req.params.cursousuario;
      const { curso, usuario } = req.body;
      conn.query(
        `UPDATE cursousuario SET 
        curso = '${curso}',
        usuario = '${usuario}'
        WHERE cursousuario = ${cursousuario} `,
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

const cursousuarioPatch = (req, res) => {
  res.json({
    msg: "patch API - controlador",
  });
};

const cursousuarioDelete = (req, res) => {
  res.json({
    msg: "delete API - controlador",
  });
};

/* Respuesta por defecto a una URL incompleta */
// TODO: buscar cómo se establece una respuesta tipo error 400
const cursousuarioNoParamURL = (req, res) => {
  res.status(400).json({
    msg: "Debe establecer un parámetro",
  });
};

module.exports = {
  cursousuarioGetUno,
  cursousuarioGetTodo,
  cursousuarioPost,
  cursousuarioPut,
  cursousuarioPatch,
  cursousuarioDelete,
  cursousuarioNoParamURL,
};
