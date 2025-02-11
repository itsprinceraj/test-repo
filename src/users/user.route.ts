import { Router } from "express";
import * as userController from "./user.controller";

const router = Router();

//  define all routes;
router
  .get("/", userController.insertUsers)
  .get("/deleteUser", userController.deleteUser)
  .get("/updateUser", userController.updateUser)
  .get("/getInfo", userController.getUserData)
  .get("/profileset", userController.insertProfile)
  .get("/getAllData", userController.getAllData)
  .get("/updateAllData", userController.updateData)
  .get("/deleteProfile", userController.deleteProfile)

export default router;
