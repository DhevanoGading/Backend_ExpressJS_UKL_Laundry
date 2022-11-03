"use strict";

const express = require("express");
const transaksiController = require("../Controllers/transaksi.controller");
const route = new express.Router();

route.get("/laporan", transaksiController.laporan);

route.post("/", transaksiController.add);
route.get("/", transaksiController.getTransaksi);
route.get("/:id_transaksi", transaksiController.getId);

route.post("/detail", transaksiController.addDetail);
route.get("/detail/:id_transaksi", transaksiController.getDetail);

route.delete("/:id_transaksi", transaksiController.delete);
route.put("/:id_transaksi", transaksiController.update);

module.exports = route;
