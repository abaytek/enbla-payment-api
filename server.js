import express from "express";
import cors from 'cors';
import { connectMongoDb } from "./config/connectMongoDb.js";
import paymentRoute from "./routes/payment-route.js";
import orderRoute from "./routes/order-route.js";

const app = express();

app.use(express.json());

// ROUTES
app.use(cors())
app.use("/api/payment/", paymentRoute);
app.use("/api/order/", orderRoute);

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL_LOCAL;
app.listen(PORT, () => {
  connectMongoDb(MONGO_URL);
  console.log(`Server is running`);
});
