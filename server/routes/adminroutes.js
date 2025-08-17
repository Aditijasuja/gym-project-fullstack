import { Router } from "express";
import verifyToken from "../middlewares/authmiddleware.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import isLoggedIn from "../middlewares/authmiddleware.js";
import {
  getMember,
  getMemberone,
  updateMemberone,
  deleteMember,
  getMemberProgress,
  getOneMemberProgress,
  insertPlan,
  getPlan,
  updatePlan,
  deletePlan,
  planExpired,
} from "../controllers/admincontroller.js";
const router = Router();

//related to member
router.get("/member",isLoggedIn, verifyToken, verifyAdmin, getMember);
router.get("/member/:id", verifyToken, verifyAdmin, getMemberone);
router.put("/member/:id", verifyToken, verifyAdmin, updateMemberone);
router.delete("/member/:id", verifyToken, verifyAdmin, deleteMember);

// related to Progress
router.get("/progress", getMemberProgress);
router.get("/progress/:id", getOneMemberProgress);

//related to plan
router.post("/plan", insertPlan);
router.get("/plan", getPlan);
router.put("/plan/:id", updatePlan);
router.delete("/plan/:id", deletePlan);

//Optional plan expiring members
router.get("/expiringplan", planExpired);
export default router;
