"use strict";

//import
const db = require("../db");

//endpoints
module.exports = {
    //menampilkan semua outlet
    getAll: (req, res) => {
        db.query(`SELECT * FROM outlet`, (err, result) => {
            if (err) throw err;
            res.json({
                message: "Berhasil menampilkan semua data outlet",
                outlet: result
            });
        });
    },

    //menampilkan outlet berdasarkan id
    getId: (req, res) => {
        const id = req.params.id;

        db.query(`SELECT * FROM outlet WHERE id_outlet = '${id}'`, (err, result) => {
            if (err) throw err;
            res.json({
                message: "Berhasil menampilkan outlet",
                outlet: result[0]
            });
        });
    },

    //menambah data outlet
    add: (req, res) => {
        let outlet = {
            alamat: req.body.alamat,
            telp: req.body.telp,
        };

        if (!outlet.alamat || !outlet.telp) {
            res.status(402).json({
                message: "alamat dan telepon harus diisi!",
            });
        };

        db.query(`INSERT INTO outlet SET ?`, outlet, (err, result) => {
            if (err) throw err;
            res.json({
                message: "Berhasil menambahkan outlet",
                outlet: outlet,
            });
        });
    },

    //mengubah data outlet
    update: (req, res) => {
        const id = req.params.id;
        let outlet = {
            alamat: req.body.alamat,
            telp: req.body.telp,
        };

        if (!outlet.alamat || !outlet.telp) {
            res.status(402).json({
                message: "alamat dan telepon harus diisi!",
            });
        };

        db.query(`UPDATE outlet SET ? WHERE id_outlet = '${id}'`, outlet, (err, result) => {
            if (null, err) throw err;
            res.json({
                message: "Berhasil mengubah data outlet",
                outlet
            })
        })
    },


    //menghapus data outlet
    delete: (req, res) => {
        const id = req.params.id;

        db.query(`DELETE FROM outlet WHERE id_outlet = '${id}'`, (err, result) => {
            if(null, err) throw err;
            res.json({
                message: "Berhasil menghapus data outlet",
                outlet: result
            });
        });
    },

    //search outlet
    find: (req, res) => {
        let find = req.body.find;
        let sql = "SELECT * FROM outlet WHERE alamat like '%" + find + "%' or id_outlet like '%" + 
        find + "%' or telp like '%" + find + "%'";

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