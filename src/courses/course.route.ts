import { Router } from "express";
import * as courseController from "./course.controller";

const router = Router();
router
  .get("/insertCourse", courseController.insertCourseData)
  .get("/getStudent", courseController.getStudentData);

export default router;
