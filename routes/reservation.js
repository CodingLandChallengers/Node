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

router.get("/{user_id}", (req, res) => {
    pool.query("SELECT * FROM reservations WHERE user_id = ?",[req.params.user_id], (err, rows) => {
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