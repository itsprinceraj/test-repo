import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Profile {
    @PrimaryGeneratedColumn() id: number;
    @Column() number: number;
    @Column() gender: string;
    @Column() photos: string;

}