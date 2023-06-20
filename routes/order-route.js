import express from "express";
import {
  getLatestOrders,
  getOrderById,
  getOrders,
  getTotalSell,
  getTotalOrders
} from "../controllers/order-controller.js";
const router = express.Router();

router.get("/getOrders", getOrders);
router.get("/getOrder/:userId", getOrderById);
router.get("/getLatestOrders", getLatestOrders);
router.get("/getTotalSell", getTotalSell);
router.get("/getTotalOrders", getTotalOrders);



export default router;
