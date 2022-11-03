"use strict";

const express = require("express");
const outletController = require("../Controllers/outlet.controller");
const route = new express.Router();

route.get("/", outletController.getAll);
route.get("/:id", outletController.getId);
route.post("/", outletController.add);
route.put("/:id", outletController.update);
route.delete("/:id", outletController.delete);
route.post("/find", outletController.find);

module.exports = route;
