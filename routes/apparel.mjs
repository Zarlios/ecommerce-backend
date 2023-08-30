import express from "express";

import Apparel from "../db/models/apparel.mjs"

const products = express.Router();

products.get("/", (req, res) => {
  Apparel.find({}).then((results) => {
    res.status(200).json(results);
  })
})

products.post("/", (req, res) => {
  Apparel.create(req.body).then((results) =>{
    res.status(200).json(results);
  })
})

export default products;