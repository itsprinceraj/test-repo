import expressAsyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import { AppDataSource } from "../services/database.service";
import { Students } from "./student.schema";
import { Courses } from "./course.schema";

// create repo of student ;
const studentRepo = AppDataSource.getRepository(Students);

// insert course data
export const insertCourseData = expressAsyncHandler(
  async (req: Request, res: Response) => {
    let student = new Students();

    //  create course1
    let course1 = new Courses();
    course1.name = "C++";
    course1.courseCode = 205;
    course1.description = "Cpp course";

    //  create course2
    let course2 = new Courses();
    course2.name = "Java";
    course2.courseCode = 210;
    course2.description = "java course";

    //  create student
    student.name = "Shri Ram";
    student.age = 22;
    student.fatherName = "shri dashrath";
    student.courses = [course1, course2];

    const studentData = await studentRepo.save(student);

    res.status(201).json({
      data: studentData,
      message: "student created",
    });
  }
);

// get all student data;
export const getStudentData = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const studentData = await studentRepo.find();

    if (studentData) {
      res.status(201).json({
        studentData,
        message: "student data fetched",
      });
    } else {
      res.json({
        message: "No data found",
      });
    }
  }
);
