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
conexion.query("select * from comentario", function (error, results, fields) {
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

const comentarioGetUno = (req = request, res = response) => {
  poolMySQL.getConnection(function (err, conn) {
    if (err) {
      res.send("Ha ocurrido un error: " + err);
    } else {
      const { publicacion } = req.body;
      conn.query(
        `select pu.publicacion, pu.titulo, pu.fecha fechapublicacion, us.registroacademico, us.nombre, us.apellido, co.fecha, co.texto 
        from comentario co 
        left join publicacion pu on co.publicacion = pu.publicacion 
        left join usuario us on co.usuario = us.usuario 
        where co.publicacion = ${publicacion}`,
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

const comentarioGetTodo = (req = request, res = response) => {
  poolMySQL.getConnection(function (err, conn) {
    if (err) {
      res.send("Ha ocurrido un error: " + err);
    } else {
      // console.log(req.body);
      const { usuario = "0" } = req.query;
      const { publicacion = "0" } = req.query;
      /*console.log(`select pu.publicacion, pu.titulo, pu.fecha fechapublicacion, us.registroacademico, us.nombre, us.apellido, co.fecha, co.texto 
      from comentario co 
      left join publicacion pu on co.publicacion = pu.publicacion 
      left join usuario us on co.usuario = us.usuario 
      where co.usuario = ${usuario}`);*/
      let condicion = ``;
      if (usuario != "0") condicion = `co.usuario = '${usuario}'`;
      if (publicacion != "0") condicion = `co.publicacion = '${publicacion}'`;

      console.log(`usuario: ${usuario} publicacion: ${publicacion}`);
      const q = `select pu.publicacion, pu.titulo, pu.fecha fechapublicacion, us.registroacademico, us.nombre, us.apellido, co.fecha, co.texto 
      from comentario co 
      left join publicacion pu on co.publicacion = pu.publicacion 
      left join usuario us on co.usuario = us.usuario 
      where ${condicion}
      order by co.fecha desc`;
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

const comentarioPost = (req, res) => {
  poolMySQL.getConnection(function (err, conn) {
    if (err) {
      res.send("Ha ocurrido un error: " + err);
    } else {
      const { publicacion, usuario, texto } = req.body;
      const q = `INSERT INTO comentario (publicacion, usuario, fecha, texto) VALUES ('${publicacion}', '${usuario}', NOW(), '${texto}') `;
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
//de la forma "127.0.0.1:8089/api/comentarios/10"
//se requiere actualizar el comentario con id 10
const comentarioPut = (req, res) => {
  poolMySQL.getConnection(function (err, conn) {
    if (err) {
      res.send("Ha ocurrido un error: " + err);
    } else {
      const comentario = req.params.comentario;
      const { texto } = req.body;
      conn.query(
        `UPDATE comentario SET 
        texto = '${texto}'
        WHERE comentario = ${comentario} `,
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

const comentarioPatch = (req, res) => {
  res.json({
    msg: "patch API - controlador",
  });
};

const comentarioDelete = (req, res) => {
  poolMySQL.getConnection(function (err, conn) {
    if (err) {
      res.send("Ha ocurrido un error: " + err);
    } else {
      const comentario = req.params.comentario;
      conn.query(
        `DELETE FROM comentario WHERE comentario = ${comentario} `,
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

/* Respuesta por defecto a una URL incompleta */
const comentarioNoParamURL = (req, res) => {
  res.status(400).json({
    msg: "Debe establecer un parámetro",
  });
};

module.exports = {
  comentarioGetUno,
  comentarioGetTodo,
  comentarioPost,
  comentarioPut,
  comentarioPatch,
  comentarioDelete,
  comentarioNoParamURL,
};
