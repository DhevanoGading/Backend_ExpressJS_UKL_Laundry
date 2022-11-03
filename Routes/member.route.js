"use strict";

const express = require("express");
const memberController = require("../Controllers/member.controller.");
const route = new express.Router();

route.get("/", memberController.getAll);
route.get("/:id", memberController.getId);
route.post("/", memberController.add);
route.put("/:id", memberController.update);
route.delete("/:id", memberController.delete);
route.post("/find", memberController.find);

module.exports = route;