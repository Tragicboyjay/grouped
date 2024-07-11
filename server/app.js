require('dotenv').config();
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const db = require("./db")

const { sanitizeMiddleware } = require("./middleware/sanitizeMiddleware");

const topicRoute = require('./routes/topicRoute')
const authRoute = require('./routes/authRoute')
const groupRoute = require('./routes/groupRoute')
const messageRoute = require('./routes/messageRoute')

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(sanitizeMiddleware);

app.use('/topics', topicRoute);
app.use('/auth', authRoute);
app.use('/groups', groupRoute);
app.use('/messages', messageRoute);

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