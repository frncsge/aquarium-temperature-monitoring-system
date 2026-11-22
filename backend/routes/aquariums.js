import express from "express";
import { getAquariums, createAquarium } from "../controllers/aquariums.js";

const router = express.Router();

router.get("/", getAquariums);
router.post("/", createAquarium);

export default router;
