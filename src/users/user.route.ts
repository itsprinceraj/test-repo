import { Router } from "express";
import * as userController from "./user.controller";

const router = Router();

//  define all routes;
router
  .get("/", userController.insertUsers)
  .get("/deleteUser", userController.deleteUser)
  .get("/updateUser", userController.updateUser)
  .get("/getInfo", userController.getUserData);

export default router;
