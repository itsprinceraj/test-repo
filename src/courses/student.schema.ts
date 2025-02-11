import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Courses } from "./course.schema";

@Entity({
  name: "student",
})
export class Students {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column() age: number;
  @Column() fatherName: string;

  @ManyToMany(() => Courses, { cascade: true, eager: true })
  @JoinTable({ name: "course_table" })
  courses: Courses[];
}
