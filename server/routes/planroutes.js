import {Router} from "express";
import {planUser} from "../controllers/plancontroller.js";

const router = Router();

router.post('/plan', planUser);

export default router;