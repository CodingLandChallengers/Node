const express = require('express')
const mysql = require('mysql')

const router = express.Router()

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password:"mysql",
    database: "blasti_bd"
})

function getConnection(){
    return pool
}


router.get("/login/:email/:password", (req, res) => {
    console.log(req.params.email)
    pool.query("SELECT * FROM users WHERE email = ? AND password = ?", [req.params.email, req.params.password], (err, rows) => {
        if(err){
            console.log(err)
            res.sendStatus(500)
            return
        }
        res.status(200)
        res.json(rows[0])
    })
})




module.exports = router