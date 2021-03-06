const express = require('express')
const mysql = require('mysql')

const router = express.Router()

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    //password:"mysql",
    database: "blasti_bd"
})

function getConnection(){
    return pool
}

router.get("/all/:category", (req, res) => {
    var category = req.params.category
    if(category == 0){
        pool.query("SELECT * FROM events WHERE start_date >= NOW() ORDER BY YEAR(start_date), MONTH(start_date), DAY(start_date) LIMIT 10",[req.params.category], (err, rows) => {
            if(err){
                console.log(err)
                res.sendStatus(500)
                return
            }
            res.status(200)
            res.json(rows)
        })
    }else{
        pool.query("SELECT * FROM events WHERE category = ? LIMIT 10",[req.params.category], (err, rows) => {
            if(err){
                console.log(err)
                res.sendStatus(500)
                return
            }
            res.status(200)
            res.json(rows)
        })
    }
})

router.get("/more/:category", (req, res) => {
    var category = req.params.category
    if(category == 0){
        pool.query("SELECT * FROM events WHERE start_date >= NOW() ORDER BY YEAR(start_date), MONTH(start_date), DAY(start_date) LIMIT 50",[req.params.category], (err, rows) => {
            if(err){
                console.log(err)
                res.sendStatus(500)
                return
            }
            res.status(200)
            res.json(rows)
        })
    }else{
        pool.query("SELECT * FROM events WHERE category = ?",[req.params.category], (err, rows) => {
            if(err){
                console.log(err)
                res.sendStatus(500)
                return
            }
            res.status(200)
            res.json(rows)
        })
    }
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

router.get("/org/all/:user_id", (req, res) => {
    pool.query("SELECT e.*, SUM(r.tickets) as bought_tickets FROM events e LEFT JOIN reservations r on e.id = r.event_id WHERE e.user_id = ? group by e.id ORDER BY e.start_date DESC", [req.params.user_id], (err, rows) => {
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

router.get("/search/:keyword", (req, res) => {
    getConnection().query("SELECT * FROM events WHERE name LIKE ?", ['%'+req.params.keyword+'%'], (err, rows) => {
        if(err){
            console.log(err)
            res.sendStatus(500)
        }
        res.status(200)
        res.send(rows)
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