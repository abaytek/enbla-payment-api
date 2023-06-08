import express from "express";
import {
  payWithChapa,
  verifyPayment,
} from "../controllers/payment-controller.js";

const router = express.Router();

router.post("/chapa", payWithChapa);

router.post("/verify", verifyPayment);

export default router;
