require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const db = require("./db"); 
const app = express();
const http = require("http");

const port = process.env.PORT || 3000; 

const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET","POST"]
    },
});

const { sanitizeMiddleware } = require("./middleware/sanitizeMiddleware");
const { handleWebSocketEvents } = require("./webSocketHandler");

const topicRoute = require('./routes/topicRoute');
const authRoute = require('./routes/authRoute');
const groupRoute = require('./routes/groupRoute');
const messageRoute = require('./routes/messageRoute');
const userRoute = require('./routes/userRoute');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 

app.use(sanitizeMiddleware); 

// Route handling
app.use('/topics', topicRoute);
app.use('/auth', authRoute);
app.use('/groups', groupRoute);
app.use('/messages', messageRoute);
app.use('/users', userRoute);

app.get("/test", (req, res) => {
    return res.send("working!");
});

handleWebSocketEvents(io);

server.listen(port, () => {
    db.connect((err) => {
        if (err) {
            console.error('Database connection failed:', err.stack);
            return;
        }
        console.log(`Connected to db & listening at http://localhost:${port}/`);
    });   
});
