import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Students } from "./student.schema";

@Entity({
  name: "course",
})
export class Courses {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column() description: string;
  @Column() courseCode: number;
}
