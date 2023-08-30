import express from "express";

import Collectibles from "../db/models/collectibles.mjs"

const collectibleServer = express.Router();

collectibleServer.get("/", (req, res) => {
  Collectibles.find({}).then((results) => {
    res.status(200).json(results);
  })
})

collectibleServer.post("/", (req, res) => {
  Collectibles.create(req.body).then((results) =>{
    res.status(200).json(results);
  })
})

export default collectibleServer;