const express = require('express');
const app = express();
const port = 5000;
const server = require('http').Server(app);
const parser = require('body-parser');
const userRouter = require('./routers/userManager.js');
const cors = require('cors');

server.listen(port, () => {
    console.log("express server started at port:" + port);
});
app.use(cors());
app.use(parser.json());
app.use('/user', userRouter);
// app.use(express.static('./uploads'))