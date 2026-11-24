import express from "express";
import { getAquariums, createAquarium } from "../controllers/aquariums.js";
import { authenticateUser } from "../middlewares/auth.js";

const router = express.Router();

router.use(authenticateUser);

router.get("/", getAquariums);
router.post("/", createAquarium);

export default router;
