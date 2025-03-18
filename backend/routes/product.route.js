import express from "express";

import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const product_router = express.Router();

product_router.get("/", getProducts);
product_router.post("/", createProduct);
product_router.put("/:id", updateProduct);
product_router.delete("/:id", deleteProduct);

export default product_router;
