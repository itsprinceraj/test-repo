import { Router } from "express";
import * as companyController from "./company.controller";
const router = Router();

router
  .get("/createCom", companyController.insertCompany)
  .get("/findData", companyController.findData)
  .get("/updateData", companyController.updateData)
  .get("/deleteData", companyController.deleteData);

export default router;
