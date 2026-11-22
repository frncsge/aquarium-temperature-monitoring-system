import express from "express";
import { createAquarium } from "../controllers/aquariums.js";

const router = express.Router();

router.post("/", createAquarium);

export default router;
