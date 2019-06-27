const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const authorization = require("../routers/authorization.js");
const authRouter = require("../routers/authRouter.js");
const usersRouter = require("../routers/usersRouter.js");
const restaurantsRouter = require("../routers/restaurantsRouter.js");
const serversRouter = require("../routers/serversRouter.js");
const transactionsRouter = require("../routers/transactionsRouter.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/users", authorization, usersRouter);
server.use("/api/restaurants", authorization, restaurantsRouter);
server.use("/api/servers", authorization, serversRouter);
server.use("/api/transactions", authorization, transactionsRouter);

module.exports = server;
