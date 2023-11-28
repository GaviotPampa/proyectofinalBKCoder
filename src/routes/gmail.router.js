import { Router } from "express";
import { sendGmail } from "../controllers/gmail.controllers.js";

const router = Router();

router.post('/gmail', sendGmail)

export default router;