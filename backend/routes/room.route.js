import express from "express";


import { getRooms, searchRooms } from "../controllers/room.controller.js";
const room_router = express.Router();

room_router.get("/", getRooms);
room_router.post("/search", searchRooms);

export default room_router;
