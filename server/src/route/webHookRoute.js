import express from "express";
import * as paymentCtr from "../controllers/paymentCtr";
require("dotenv").config();
const router = express.Router();
router.post(
  "/",
  express.raw({ type: "application/json" }),
  paymentCtr.handlerWebhook
);

export default router;
