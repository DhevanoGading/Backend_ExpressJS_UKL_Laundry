"use strict";

const express = require("express");
const userController = require("../Controllers/user.controller");
const route = new express.Router();

route.get("/", userController.getAll);
route.get("/:id", userController.getId);
route.post("/", userController.add);
route.put("/:id", userController.update);
route.delete("/:id", userController.delete);
route.post("/login", userController.login);
route.post("/find", userController.find);

module.exports = route;
