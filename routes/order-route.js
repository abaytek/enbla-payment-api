import express from "express";
import {
  getLatestOrders,
  getOrderById,
  getOrders,
} from "../controllers/order-controller.js";
const router = express.Router();

router.get("/getOrders", getOrders);
router.get("/getOrder/:userId", getOrderById);
router.get("/getLatestOrders", getLatestOrders);

export default router;
