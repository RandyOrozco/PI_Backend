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
conexion.query("select * from publicacion", function (error, results, fields) {
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

const publicacionGetUno = (req = request, res = response) => {
  poolMySQL.getConnection(function (err, conn) {
    if (err) {
      res.send("Ha ocurrido un error: " + err);
    } else {
      const { publicacion } = req.query;
      conn.query(
        `select pu.*, us.registroacademico, us.nombre nombreusuario, us.apellido, cu.nombre nombrecurso, ca.nombre nombrecatedratico 
        from publicacion pu left 
        join usuario us on pu.usuario = us.usuario 
        left join curso cu on pu.curso = cu.curso 
        left join catedratico ca on pu.catedratico = ca.catedratico 
        where pu.publicacion = ${publicacion}`,
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

const publicacionGetTodo = (req = request, res = response) => {
  poolMySQL.getConnection(function (err, conn) {
    if (err) {
      res.send("Ha ocurrido un error: " + err);
    } else {
      conn.query(
        `select pu.publicacion, pu.fecha, pu.titulo, us.registroacademico, us.nombre nombreusuario, us.apellido, cu.nombre nombrecurso, ca.nombre nombrecatedratico 
        from publicacion pu 
        left join usuario us on pu.usuario = us.usuario 
        left join curso cu on pu.curso = cu.curso 
        left join catedratico ca on pu.catedratico = ca.catedratico 
        order by fecha desc `,
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

const publicacionPost = (req, res) => {
  poolMySQL.getConnection(function (err, conn) {
    if (err) {
      res.send("Ha ocurrido un error: " + err);
    } else {
      const { usuario, curso, catedratico, titulo, texto } = req.body;
      const q = `INSERT INTO publicacion (usuario, curso, catedratico, fecha, titulo, texto ) VALUES ('${usuario}', '${curso}', '${catedratico}', NOW(), '${titulo}', '${texto}') `;
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

/* Trabajando con parámetros de segmento */
//de la forma "127.0.0.1:8089/api/publicacions/10"
//se requiere actualizar el publicacion con id 10
const publicacionPut = (req, res) => {
  poolMySQL.getConnection(function (err, conn) {
    if (err) {
      res.send("Ha ocurrido un error: " + err);
    } else {
      const publicacion = req.params.publicacion;
      const { curso, catedratico, titulo, texto } = req.body;
      const q = `UPDATE publicacion SET 
      curso = '${curso}',
      catedratico = '${catedratico}',
      titulo = '${titulo}',
      texto = '${texto}'
      WHERE publicacion = ${publicacion} `;
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

const publicacionPatch = (req, res) => {
  res.json({
    msg: "patch API - controlador",
  });
};

const publicacionDelete = (req, res) => {
  res.json({
    msg: "delete API - controlador",
  });
};

/* Respuesta por defecto a una URL incompleta */
// TODO: buscar cómo se establece una respuesta tipo error 400
const publicacionNoParamURL = (req, res) => {
  res.status(400).json({
    msg: "Debe establecer un parámetro",
  });
};

module.exports = {
  publicacionGetUno,
  publicacionGetTodo,
  publicacionPost,
  publicacionPut,
  publicacionPatch,
  publicacionDelete,
  publicacionNoParamURL,
};
