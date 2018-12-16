const express = require('express')
const mysql = require('mysql')

const router = express.Router()

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    database: "blasti_bd"
})

function getConnection(){
    return pool
}

router.get("/all/:category", (req, res) => {
    pool.query("SELECT * FROM events WHERE category = ? LIMIT 10",[req.params.category], (err, rows) => {
        if(err){
            console.log(err)
            res.sendStatus(500)
            return
        }
        res.status(200)
        res.json(rows)
    })
})

router.get("/specials", (req, res) => {
    pool.query("SELECT * FROM events WHERE special = 1 LIMIT 4", (err, rows) => {
        if(err){
            console.log(err)
            res.sendStatus(500)
            return
        }
        res.status(200)
        res.json(rows)
    })
})



module.exports = router