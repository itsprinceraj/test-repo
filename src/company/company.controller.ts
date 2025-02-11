import expressAsyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import { Company } from "./company.schema";
import { Product } from "./product.schema";
import { AppDataSource } from "../services/database.service";
import { LessThan } from "typeorm";

const companyRepo = AppDataSource.getRepository(Company);
const productRepo = AppDataSource.getRepository(Product);
let company = new Company();
let product = new Product();


export const insertCompany = expressAsyncHandler(async (req: Request, res: Response) => {

    let products: Product[] = [];

    //  create product1
    let iphone = new Product();

    iphone.name = "iPhone";
    iphone.price = 1000;
    iphone.description = "Apple iPhone";

    //  create product2
    let ipad = new Product();

    ipad.name = "ipad air";
    ipad.price = 50000;
    ipad.description = "ipad hai";

    // push products;
    products.push(iphone, ipad)

    //  create compnayl
    company.name = "Apple";
    company.description = "Apple Inc.";
    company.product = products;

    const companyData = await companyRepo.save(company);

    res.status(201).json({
        data: companyData,
        message: "company created"
    })

})

//  finda all data 
export const findData = expressAsyncHandler(async (req: Request, res: Response) => {

    // const companyData = await companyRepo.find({
    //     where: {
    //         product: {
    //             price: LessThan(10000)
    //         }
    //     }
    // });


    const companyData = await companyRepo.find();

    res.status(201).json({
        companyData,
        message: "Data fetched"
    })
})

// update data;
export const updateData = expressAsyncHandler(async (req: Request, res: Response) => {

    // get data which you want to update;
    const companyData = await companyRepo.findOne({ where: { id: 1 } });

    if (companyData) {
        companyData.name = "Apple updated"
        companyData.product[0].price = 7000;

        //  save data;
        const updatedData = await companyRepo.save(companyData);

        res.status(201).json({
            updatedData,
            message: "Data updated"
        })
    }

})


// delete Data;
export const deleteData = expressAsyncHandler(async (req: Request, res: Response) => {

    await productRepo.delete({ id: 1 });
    res.status(201).json({
        message: "product Deleted"
    })

})
