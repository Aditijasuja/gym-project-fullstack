import {Router} from "express";
import { myProfile, getPlan, updatePassword, getProgress, updateProgress } from "../controllers/myprofilecontroller.js";
import isLoggedIn from "../middlewares/authmiddleware.js";

const router = Router();

router.get('/myprofile', isLoggedIn, myProfile);
router.get('/getplan', getPlan);
router.put('/updatepassword', isLoggedIn, updatePassword);
router.get('/getprogress', isLoggedIn, getProgress);
router.put('/updateprogress', isLoggedIn, updateProgress);

export default router;
