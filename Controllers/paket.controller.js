"use strict";

//import
const db = require("../db");

//endpoints
module.exports = {
    //menampilkan semua paket
    getAll: (req, res) => {
        db.query(`SELECT * FROM paket`, (err, result) => {
            if (err) throw err;
            res.json({
                message: "Berhasil menampilkan semua data paket",
                outlet: result
            });
        });
    },

    //menampilkan paket berdasarkan id
    getId: (req, res) => {
        const id = req.params.id;

        db.query(`SELECT * FROM paket WHERE id_paket = '${id}'`, (err, result) => {
            if (err) throw err;
            res.json({
                message: "Berhasil menampilkan paket",
                paket: result[0]
            });
        });
    },

    //menambah data paket
    add: (req, res) => {
        let paket = {
            jenis: req.body.jenis,
            harga: req.body.harga,
        };

        if (!paket.jenis || !paket.harga) {
            res.status(402).json({
                message: "jenis dan harga harus diisi!",
            });
        };

        db.query(`INSERT INTO paket SET ?`, paket, (err, result) => {
            if (err) throw err;
            res.json({
                message: "Berhasil menambahkan paket",
                paket: paket,
            });
        });
    },

    //mengubah data paket
    update: (req, res) => {
        const id = req.params.id;

        let paket = {
            jenis: req.body.jenis,
            harga: req.body.harga,
        };

        if (!paket.jenis || !paket.harga) {
            res.status(402).json({
                message: "jenis dan harga harus diisi!",
            });
        };

        db.query(`UPDATE paket SET ? WHERE id_paket = '${id}'`, paket, (err, result) => {
            if (null, err) throw err;
            res.json({
                message: "Berhasil mengubah data paket",
                paket
            })
        })
    },


    //menghapus data paket
    delete: (req, res) => {
        const id = req.params.id;

        db.query(`DELETE FROM paket WHERE id_paket = '${id}'`, (err, result) => {
            if(null, err) throw err;
            res.json({
                message: "Berhasil menghapus data paket",
                paket: result
            });
        });
    },

    //search outlet
    find: (req, res) => {
        let find = req.body.find;
        let sql = "SELECT * FROM paket WHERE jenis like '%" + find + "%' or id_paket like '%" + 
        find + "%' or harga like '%" + find + "%'";

        db.query(sql, (err, result) => {
            if (err) {
                throw err;
            } else {
                res.json({
                    result
                });
            }
        });
    },
}