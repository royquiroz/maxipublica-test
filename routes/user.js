const express = require("express");
const router = express.Router();
const User = require("../models/User");
const email = require("../helpers/validateEmail");

router.post("/", (req, res) => {
  email.validateEmail(req.body.email, res);

  req.body.fecha_nacimiento = new Date(req.body.fecha_nacimiento);

  User.create(req.body)
    .then(user => {
      res.status(201).json({
        user,
        msg: "Usuario creado con éxito"
      });
    })
    .catch(err => {
      err.code === 11000
        ? res.status(500).json({ err, msg: "Usuario ya existe" })
        : res.status(400).json({ err, msg: "Hacen falta datos" });
    });
});

router.get("/", (req, res) => {
  User.find(req.query).then(users => {
    res
      .status(202)
      .json({
        users,
        msg: "Usuario encontrado exitosamente"
      })
      .catch(err => {
        res.status(500).json({
          err,
          msg: "Usuario no existe en la BD"
        });
      });
  });
});

router.put("/:id", (req, res) => {
  if (req.body.email !== undefined) {
    email.validateEmail(req.body.email, res);
  }

  if (req.body.fecha_nacimiento !== undefined) {
    req.body.fecha_nacimiento = new Date(req.body.fecha_nacimiento);
  }

  User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(user => {
      res.status(201).json({
        user,
        msg: "Datos actualizados correctamente"
      });
    })
    .catch(err => {
      res.status(500).json({
        err,
        msg: "No se pudo actualizar el usuario"
      });
    });
});

module.exports = router;
