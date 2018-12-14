const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")

const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use("/public", express.static(path.join(__dirname, "public")))

const userRoute = require("./routes/user")

app.use("/users", userRoute)
app.listen(3000, () => {
    console.log("Server is up and listening on port 3000...")
})