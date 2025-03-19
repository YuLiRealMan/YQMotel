import express from "express";


import {getOrders,createOrder,deleteOrder,getOrder,updateOrder} from "../controllers/order.controller.js";

const order_router = express.Router();

order_router.get("/", getOrders);
order_router.post("/", createOrder);
order_router.put("/:id", updateOrder);
order_router.delete("/:id", deleteOrder);
order_router.get("/:id", getOrder);
export default order_router;
