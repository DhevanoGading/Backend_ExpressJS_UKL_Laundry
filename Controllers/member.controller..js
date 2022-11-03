"use strict";

//import
const db = require("../db");

//endpoints
module.exports = {
    //menampilkan semua member
    getAll: (req, res) => {
        db.query(`SELECT * FROM member`, (err, result) => {
            if (err) throw err;
            res.json({
                message: "Berhasil menampilkan semua data member",
                user: result
            });
        });
    },

    //menampilkan member berdasarkan id
    getId: (req, res) => {
        const id = req.params.id;

        db.query(`SELECT * FROM member WHERE id_member = '${id}'`, (err, result) => {
            if (err) throw err;
            res.json({
                message: "Berhasil menampilkan member",
                user: result[0]
            });
        });
    },

    //menambah data member
    add: (req, res) => {
        let member = {
            nama_member: req.body.nama_member,
            alamat_member: req.body.alamat_member,
            jenis_kelamin: req.body.jenis_kelamin,
            tlp: req.body.tlp,
        };

        if (!member.nama_member, !member.alamat_member, !member.jenis_kelamin || !member.tlp) {
            res.json({
                message: "Nama, alamat, jenis kelamin dan nomor telepon harus diisi!",
            });
        }

        db.query(`INSERT INTO member SET ?`, member, (err, result) => {
            if (err) throw err;
            res.json({
                message: "Berhasil menambahkan member",
                user: member,
            })
        })
    },

    //mengubah data member
    update: (req, res) => {
        const id = req.params.id;
        let member = {
            nama_member: req.body.nama_member,
            alamat_member: req.body.alamat_member,
            jenis_kelamin: req.body.jenis_kelamin,
            tlp: req.body.tlp
        }

        if (!member.nama_member, !member.alamat_member, !member.jenis_kelamin || !member.tlp) {
            res.json({
                message: "Nama, alamat, jenis kelamin dan nomor telepon harus diisi!",
            });
        }

        db.query(`UPDATE member SET ? WHERE id_member = '${id}'`, member, (err, result) => {
            if (null, err) throw err;
            res.json({
                message: "Berhasil mengubah data member",
                member
            })
        })
    },


    //menghapus data member
    delete: (req, res) => {
        const id = req.params.id;

        db.query(`DELETE FROM member WHERE id_member = '${id}'`, (err, result) => {
            if(null, err) throw err;
            res.json({
                message: "Berhasil menghapus data member",
                member: result
            });
        });
    },

    //search member
    find: (req, res) => {
        let find = req.body.find;
        let sql = "SELECT * FROM member WHERE nama_member like '%" + find + "%' or id_member like '%" + 
        find + "%' or alamat_member like '%" + find + "%' or tlp like '%" + find +"%'";

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