import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

//  now create an entity User
@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;
  @Column() firstName: string;
  @Column() lastname: string;
  @Column() email: string;
  @Column() password: string;
}
