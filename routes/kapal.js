const express = require('express')
const router = express.Router()

const connection = require('../config/db')
const {body, validationResult} = require('express-validator')

router.get('/', function(req,res){
    connection.query('SELECT id_kapal, nama_kapal, pemilik.nama_pemilik, dpi.nama_dpi, alat_tangkap.nama_alat_tangkap FROM kapal JOIN pemilik ON kapal.id_pemilik = pemilik.id_pemilik JOIN dpi ON kapal.id_dpi = dpi.id_dpi JOIN alat_tangkap ON kapal.id_alat_tangkap = alat_tangkap.id_alat_tangkap', function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'server failed',
                error: err,
            })
        } else {
            return res.status(200).json({
                status: true,
                message:'Data Detail KK',
                data: rows
            })
        }
    })
})

router.post('/store', [
    body('nama_kapal').notEmpty(),
    body('id_pemilik').notEmpty(),
    body('id_dpi').notEmpty(),
    body('id_alat_tangkap').notEmpty(),
    ], (req, res) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        })
    }
    let Data = {
        nama_kapal: req.body.nama_kapal,
        id_pemilik: req.body.id_pemilik,
        id_dpi: req.body.id_dpi,
        id_alat_tangkap: req.body.id_alat_tangkap,
    }
    connection.query('insert into kapal set ? ', Data, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'server failed',
                error : err
            })
        } else {
            return res.status(201).json({
                status: true,
                message:'kapal create',
                data: rows[0]
            })
        }
    })
})

router.get('/(:id)', function(req,res) {
    let id= req.params.id
    connection.query(`SELECT id_kapal, nama_kapal, pemilik.nama_pemilik, dpi.nama_dpi, alat_tangkap.nama_alat_tangkap FROM kapal JOIN pemilik ON kapal.id_pemilik = pemilik.id_pemilik JOIN dpi ON kapal.id_dpi = dpi.id_dpi JOIN alat_tangkap ON kapal.id_alat_tangkap = alat_tangkap.id_alat_tangkap = ${id}`, function(err,rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'server error',
                error: err,
            })
        }
        if(rows.length <=0){
            return res.status(404).json({
                status: false,
                message: 'Not Found',
                error: err
            })
        } else {
            return res.status(200).json({
                status: true,
                message:'data kapal : ',
                data: rows[0]
            })
        }
    })
})

router.patch('/update/:id',[
    body('nama_kapal').notEmpty(),
    body('id_pemilik').notEmpty(),
    body('id_dpi').notEmpty(),
    body('id_alat_tangkap').notEmpty(),
], (req,res) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        })
    }
    let id = req.params.id
    let data = {
        nama_kapal: req.body.nama_kapal,
        id_pemilik: req.body.id_pemilik,
        id_dpi: req.body.id_dpi,
        id_alat_tangkap: req.body.id_alat_tangkap,
    }
    connection.query(`update kapal set ? where id_kapal = ${id}`, data, function(err,rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'server error',
                error: err
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'update'
            })
        }
    })
})

router.delete('/delete/(:id)', function(req, res){
    let id = req.params.id
    connection.query(`delete from kapal where id_kapal = ${id}`, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'server error',
                error: err
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data di hapus'
            })
        }
    })
})

module.exports = router