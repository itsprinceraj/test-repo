import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Company } from "./company.schema";

@Entity()
export class Product {
    @PrimaryGeneratedColumn() id: number;
    @Column() name: string;
    @Column() price: number;
    @Column() description: string;

    @ManyToOne(() => Company, (product) => product.product, { onDelete: "CASCADE" })
    company: Company;

}