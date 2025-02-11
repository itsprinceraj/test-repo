import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Profile } from "./profile.schema";


//  now create an entity User
@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;
  @Column() firstName: string;
  @Column() lastname: string;
  @Column() email: string;
  @Column() password: string;
  @OneToOne(() => Profile, { cascade: true, eager: true, onDelete: "CASCADE" })  // marking cascade true indicates that if we save user , it will automatically save profile and hit our database only one time ;
  @JoinColumn({
    name: "profile_id",
    referencedColumnName: "id",
  })
  profile: Profile;
}
