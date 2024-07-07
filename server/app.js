require('dotenv').config();
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const db = require("./db")

const topicRoute = require('./routes/topicRoute')

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/topics', topicRoute)

app.get("/test", (req,res) => {
    return res.send("workng!");
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    db.connect((err) => {
        if (err) {
            console.error('Database connection failed:', err.stack);
            return;
        }
        console.log(`Connected to db & listening at http://localhost:${port}/`);
    });   
})