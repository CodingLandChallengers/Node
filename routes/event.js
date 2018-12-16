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

router.get("/more/:category", (req, res) => {
    pool.query("SELECT * FROM events WHERE category = ?",[req.params.category], (err, rows) => {
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

//Find event by id
router.get("/:id", (req, res) => {
    const queryString = "SELECT * FROM events WHERE id = ?"
    getConnection().query(queryString, [req.params.id], (err, rows) => {
        if(err){
            console.log(err)
            res.sendStatus(500)
            return
        }
        res.status(200)
        res.json(rows[0])
    })
})

//get available tickets for event
router.get("/last_tickets/:id", (req, res) => {
    const queryString = "SELECT (e.tickets - SUM(r.tickets)) available FROM events e JOIN reservations r ON e.id = r.event_id GROUP BY e.id HAVING e.id = ?"
    getConnection().query(queryString, [req.params.id], (err, rows) => {
        if(err){
            console.log(err)
            res.sendStatus(500)
            return
        }
        res.status(200)
        console.log(rows)
        if(rows.length == 0){
            res.send(-1 + "")
            return
        }
        res.send(rows[0].available + "")
    })
})

//Add Reservation
router.post("/add_reservation", (req, res) => {
    const queryString = "INSERT INTO reservations (user_id, event_id, tickets) VALUES(?,?,?)"
    getConnection().query(queryString, [req.body.user_id, req.body.event_id, req.body.tickets], (err) => {
        if(err){
            console.log(err)
            res.sendStatus(500)
            return
        }
        res.sendStatus(200)
    })
})

module.exports = router