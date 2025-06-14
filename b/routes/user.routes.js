import express, { Router } from "express"
import protectRoute from "../middlewares/protectRoute.middleware.js";
import { getUserForSidebar } from "../controllers/user.controller.js";


const router=Router()

router.get("/",protectRoute,getUserForSidebar)

export default router;