// Imports the http module
const http = require("http");

//require mongoose for accessing MongoDB
const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config();

const express = require("express");

const app = express();

const reviews = require("./routers/reviews");

const PORT = process.env.PORT || 4040;

mongoose.connect(process.env.MONGODB);

const database = mongoose.connection;

// const server = http.createServer((request, response) => {
//   if (request.url === "/status" && request.method === "GET") {
//     response.writeHead(200, { "Content-Type": "application/json" });
//     response.write(JSON.stringify({ message: "Service healthy" }));
//     response.end();
//   }
// });

database.on("error", console.error.bind(console, "There's a connection error"));

database.once(
  "open",
  console.log.bind(console, "Mongo connection is now Open!")
);

const logging = (request, response, next) => {
  console.log(`${request.method} ${request.url} ${Date.now()}`);
  next();
};
app.use(express.json());
app.use(logging);

app.use("/reviews", reviews);

app.get("/status", (request, response) => {
  response.send(JSON.stringify({ message: "Service healthy" }));
});
