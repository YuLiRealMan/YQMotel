import express from "express";


import { getRooms } from "../controllers/room.controller.js";
const room_router = express.Router();

room_router.get("/", getRooms);


export default room_router;
