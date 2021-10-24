import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import morgan from "morgan"
import users from "../src/api/users.route"

const apiRoot = process.env.API_ROOT
const app = express()

app.use(cors())
process.env.NODE_ENV !== "prod" && app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Register api routes
// app.use( `${apiRoot}/users`, users)
app.use( '/api/users', users)
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app