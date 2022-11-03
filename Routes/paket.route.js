"use strict";

const express = require("express");
const paketController = require("../Controllers/paket.controller");
const route = new express.Router();

route.get("/", paketController.getAll);
route.get("/:id", paketController.getId);
route.post("/", paketController.add);
route.put("/:id", paketController.update);
route.delete("/:id", paketController.delete);
route.post("/find", paketController.find);

module.exports = route;
