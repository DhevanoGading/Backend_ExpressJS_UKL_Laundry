"use strict";

//import moment
const moment = require("moment");

//import
const db = require("../db");

//endpoints
module.exports = {
    //menambah data transaksi
    add: (req, res) => {
        const now = new Date();
        const batas = new Date();
        batas.setDate(now.getDate() + 4);

        let transaksi = {
            id_member: req.body.id_member,
            tgl: now,
            batas_waktu: batas,
            id_user: req.body.id_user,
            total: req.body.total
        };

        db.query(`INSERT INTO transaksi SET ?`, transaksi, (err, result) => {
            if (err){
                throw err;
            }else{
                let id_transaksi = result.insertId
                res.json({
                    message: "Berhasil menambahkan transaksi",
                    id_transaksi,
                });
            }
        });
    },

    //menambahkan detail transaksi
    addDetail: (req, res) => {
        let detail = {
            id_transaksi: req.body.id_transaksi,
            id_paket: req.body.id_paket,
            qty: req.body.qty,
            sub_total: req.body.sub_total
        };

        db.query(`INSERT INTO detail_transaksi SET ?`, detail, (err, result) => {
            if (err) {
                throw err;
            } else {
                res.json({
                    message: "Berhasil menambahkan detail",
                    detail
                })
            }
        })
    },

    //menampilkan semua data transaksi
    getTransaksi: (req, res) => {
        db.query(`SELECT * FROM transaksi`, (err, result) => {
            if(err) throw err
            const transaksi = result[0].tgl;
            const dateFormat = moment(transaksi).format("YYYY-MM-DD");
            res.json({
                message: "Berhasil menampilkan data transaksi",
                transaksi: result,
                date: dateFormat
            })
        })
    },

    //menampilkan data transaksi berdasarkan id transaksi
    getId: (req, res) => {
        const id_transaksi = req.params.id_transaksi;

        db.query(`SELECT * FROM transaksi WHERE id_transaksi = '${id_transaksi}'`, (err, result) => {
            if (err) throw err;
            res.json({
                message: "Berhasil menampilkan data",
                transaksi: result
            })
        })
    },

    //memanggil data detail_transaksi
    getDetail: (req, res) => {
        const id_transaksi = req.params.id_transaksi;

        db.query(`SELECT * FROM transaksi JOIN detail_transaksi ON transaksi.id_transaksi = detail_transaksi.id_transaksi JOIN paket ON detail_transaksi.id_paket = paket.id_paket WHERE detail_transaksi.id_transaksi = ${id_transaksi}`, (err, result) => {
            if (err) throw err;
            res.json({
                message: "Data detail transaksi",
                transaksi: result
            })
        })
    },

    //laporan
    laporan: (req, res) => {
        db.query(`SELECT detail_transaksi.id_detail_transaksi, transaksi.id_transaksi, transaksi.tgl, member.nama_member, user.nama_user, member.tlp, member.alamat_member, paket.jenis, detail_transaksi.qty, paket.harga, detail_transaksi.sub_total, transaksi.total FROM transaksi LEFT JOIN detail_transaksi ON transaksi.id_transaksi = detail_transaksi.id_transaksi JOIN paket ON detail_transaksi.id_paket = paket.id_paket JOIN member ON transaksi.id_member = member.id_member JOIN user ON transaksi.id_user = user.id_user GROUP BY detail_transaksi.id_transaksi`, (err, result) => {
            if (err) throw err;
            res.json({
                message: "laporan",
                laporan: result
            })
        })
    },

    //hapus data transaksi
    delete: (req, res) => {
        const id_transaksi = req.params.id_transaksi;

        db.query(`DELETE FROM transaksi WHERE id_transaksi = '${id_transaksi}'`, (err, result) => {
            if (err) throw err;
            res.json({
                message: "berhasil menghapus data transaksi",
                transaksi: result
            })
        })
    },

    //update data transaksi
    update: (req, res) => {
        const id = req.params.id_transaksi;
        let transaksi = {
            status: req.body.status,
            dibayar: req.body.dibayar,
        }

        if(req.body.dibayar === 'dibayar' && !req.body.tgl_bayar){
            transaksi.tgl_bayar = new Date();
        }

        db.query(`UPDATE transaksi SET ? WHERE transaksi.id_transaksi = '${id}'`, transaksi, (err, result) => {
            if (null) throw err;
            res.json({
                message: "Berhasil update data transaksi",
                transaksi: transaksi
            })
        })
    }
}