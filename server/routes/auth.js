import express from "express"
import { login } from "../controllers/auth.js" // a controller

const router = express.Router(); //these routes will all be configured

router.post("/login", login);

export default router
