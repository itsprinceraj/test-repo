import { Router } from "express";
import userRoutes from "./users/user.route";
const router = Router();

router.use("/users", userRoutes);

export default router;
