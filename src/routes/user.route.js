import { Router } from "express";
import {
  getAllUsers,
  getError,
  getUserById,
} from "../controllers/user.controlller";
import { hasPublishedPost } from "../middlewares/hasPublishedPost";
const router = Router();

router.get("/error", getError);

router.get("/", getAllUsers);
// hasPublishedPost is middleware checks: is post Published?
router.get("/:id", hasPublishedPost, getUserById);

export default router;
