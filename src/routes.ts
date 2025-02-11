import { Router } from "express";
import userRoutes from "./users/user.route";
import companyRoutes from "./company/company.route";
import courseRoutes from "./courses/course.route";
const router = Router();

router.use("/users", userRoutes);
router.use("/company", companyRoutes);
router.use("/course", courseRoutes);

export default router;
