import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "./db/conn.mjs";

const PORT = process.env.PORT || 5050;
const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(cors({}));
server.use(express.json());

// start the Express server
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
