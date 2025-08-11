import {Router} from "express";
import {joinUser} from "../controllers/usercontroller.js";

const router = Router();

router.post('/join', joinUser);

export default router;