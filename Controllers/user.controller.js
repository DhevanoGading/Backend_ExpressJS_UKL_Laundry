"use strict";

//import
const db = require("../db");
const md5 = require('md5');
const jwt = require("jsonwebtoken");
const KEY = "UKLLAUNDRY";

//endpoints
module.exports = {
    //menampilkan semua user
    getAll: (req, res) => {
        db.query(`SELECT * FROM user`, (err, result) => {
            if (err) throw err;
            res.json({
                message: "Berhasil menampilkan semua data user",
                user: result
            });
        });
    },

    //menampilkan user berdasarkan id
    getId: (req, res) => {
        const id = req.params.id;

        db.query(`SELECT * FROM user WHERE id_user = '${id}'`, (err, result) => {
            const user = result[0];
            if (err) throw err;
            res.json({
                message: "Berhasil menampilkan user",
                user: user
            });
        });
    },

    //menambah data user
    add: (req, res) => {
        let user = {
            nama_user: req.body.nama_user,
            username_user: req.body.username_user,
            password_user: md5(req.body.password_user),
            role: req.body.role,
        };
        if (!user.nama_user, !user.username_user, !user.password_user || !user.role) {
            res.json({
                message: "Nama, Username, dan Password harus diisi!",
            });
        }
        db.query(`insert into user set ?`, user, (err, result) => {
            if (err) throw err;
            res.json({
                message: "Success added user",
                user: user,
            })
        })
    },

    //mengubah data user
    update: (req, res) => {
        const id = req.body.id;
        let user = {
            nama_user: req.body.nama_user,
            username_user: req.body.username_user,
            password_user: md5(req.body.password_user),
            role: req.body.role,
        };

        if(!user.nama_user, !user.username_user, !user.password_user || !user.role){
            res.json({
                message: "Nama, Username, dan Password harus diisi!"
            });
        }

        db.query(`UPDATE user SET ? WHERE id_user = '${id}'`, user, (err, result) => {
            if (err) throw err;
            res.json({
                message: "Berhasil mengubah data user",
                user: user
            });
        });
    },

    //menghapus data user
    delete: (req, res) => {
        const id = req.params.id;

        db.query(`DELETE FROM user WHERE id_user = '${id}'`, (err, result) => {
            if(null, err) throw err;
            res.json({
                message: "Berhasil menghapus data user",
                user: result
            });
        });
    },

    //login user
    login: (req, res) => {
        let username_user = req.body.username_user;
        let password_user = req.body.password_user;

        if (!username_user || !password_user)
            res.json({
                message: "Username dan Password harus diisi!"
            });

        db.query(`SELECT * FROM user WHERE username_user = '${username_user}'`, (err, result) => {
            const user = result[0];

            if (typeof user === "undefined") {
                res.status(401).json({ message: "User not found" });
            } else {
                if (user.password_user === md5(password_user)) {
                    const token = jwt.sign({ user: user }, KEY);
                    res.json({
                        logged: true,
                        user: user,
                        token: token
                    });
                } else {
                    res.json({
                        message: "Invalid password"
                    });
                }
            }
        });
    },

    //search user
    find: (req, res) => {
        let find = req.body.find;
        let sql = "SELECT * FROM user WHERE nama_user like '%" + find + "%' or id_user like '%" + find + "%' or username_user like '%" + find + "%'";

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