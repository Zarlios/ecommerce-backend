import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Stripe from "stripe";
import "./loadEnvironment.mjs";

import "./db/conn.mjs";
import apparel from "./routes/apparel.mjs";
import collectibles from "./routes/collectibles.mjs";

const server = express();
const stripe = Stripe(process.env.STRIPE_URI);

server.use(express.static("public"));
server.use(express.json());
server.use(
  cors({
    origin: "https://ecommerce-backend-iulr.onrender.com",
    credentials: true,
  })
);

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const calculateOrderAmount = (cartItems) => {
  let total = 0;
  if (cartItems) {
    return (total = cartItems.reduce(
      (sum, { quantity, price }) => sum + quantity * price,
      0
    ));
  }
  return total;
};

server.post("/create-payment-intent", async (req, res) => {
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(req.body),
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

server.use("/apparel", apparel);
server.use("/collectibles", collectibles);

server.listen(4242, () => console.log("Node server listening on port 4242!"));
