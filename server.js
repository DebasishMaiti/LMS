const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors")
require("dotenv").config();
const allRoutes = require("./Route/index");
const port = process.env.PORT || 4000;
const server = express();
server.use(cors());

mongoose.connect("mongodb://localhost:27017/LMS")
   .then(() => console.log("connection Established...."))
   .catch((err) => console.log(err))


server.use(express.static('public'));
server.use(express.json());


server.use("/api", allRoutes);

// Global error handler middleware
server.use((err, req, res, next) => {
   res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

server.listen(port);