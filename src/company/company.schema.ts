import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Product } from "./product.schema";

@Entity()
export class Company {
    @PrimaryGeneratedColumn() id: number;
    @Column() name: string;
    @Column() description: string;

    @OneToMany(() => Product, (product) => product.company, { cascade: true, eager: true })
    product: Product[]
};

