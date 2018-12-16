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

router.get("/myevents/:userId", (req, res) => {
    pool.query("SELECT sum(r.tickets) as somme, e.name, e.tickets FROM reservations r JOIN events e ON r.event_id = e.id where e.user_id = ? group by e.id order by somme DESC limit 6",[req.params.userId], (err, rows) => {
        if(err){
            console.log(err)
            res.sendStatus(500)
            return
        }
        res.status(200)
        res.json(rows)
    })
})

router.get("/singleevent/:eventId", (req, res) => {
    pool.query("SELECT sum(r.tickets) as somme, e.name, e.tickets FROM reservations r JOIN events e ON r.event_id = e.id where e.id = ?",[req.params.eventId], (err, rows) => {
        if(err){
            console.log(err)
            res.sendStatus(500)
            return
        }
        res.status(200)
        res.json(rows[0])
    })
})


router.get("/eventdates/:eventId", (req, res) => {
    pool.query("SELECT sum(r.tickets) as somme, r.date FROM reservations r JOIN events e ON r.event_id = e.id where e.id = ? group by YEAR(r.date), MONTH(r.date), DAY(r.date)",[req.params.eventId], (err, rows) => {
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