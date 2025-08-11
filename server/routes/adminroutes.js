//import controller, middleware of admin 
import {Router} from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = Router();

//related to member
router.get('/member',verifyAdmin, getMember);
router.get('/member/:id', getMemberone);
router.put('/member/:id', updateMemberone);
router.delete('/member/:id', deleteMember);

// related to Progress
router.get('/progress', getMemberProgress);
router.get('/progress/:id', getOneMemberProgress);

//related to plan
router.post('/plan', insertPlan);
router.get('/plan', getPlan);
router.put('/plan/:id', updatePlan);
router.delete('/plan/:id', deletePlan);

export default route;
//Optional plan expiring members
//router.get('/expiringplan', planExpired);