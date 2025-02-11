import expressAsyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import { AppDataSource } from "../services/database.service";
import { User } from "./user.schema";

const userRepo = AppDataSource.getRepository(User);

// insert users
export const insertUsers = expressAsyncHandler(
  async (req: Request, res: Response) => {
    //  create object of UserClass
    let user: User[] = [
      Object.assign(new User(), {
        firstName: "Aman",
        lastname: "Aktar",
        email: "amanakhtar@gmail.com",
        password: "amanpasss",
      }),
      Object.assign(new User(), {
        firstName: "John",
        lastname: "Doe",
        email: "johndoe@gmail.com",
        password: "johnpass",
      }),
      Object.assign(new User(), {
        firstName: "Alice",
        lastname: "Smith",
        email: "alicesmith@gmail.com",
        password: "alicepass",
      }),
    ];

    const userData = await userRepo.save(user);
    res.status(201).json({
      data: userData,
    });
  }
);

//delete user
export const deleteUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const deletedUser = await userRepo.clear();

    res.status(201).json({
      data: deletedUser,
      message: "User deleted",
    });
  }
);

// update user
export const updateUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const updatedData = await userRepo.update(
      {
        id: 1,
      },
      { firstName: "keshav", lastname: "sharma", email: "keshav@gmail.com" }
    );
    res.status(200).json({
      data: updatedData,
      message: "User updated",
    });
  }
);

//  get all users data
export const getUserData = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const userInfo = await userRepo.find();

    res.status(201).json({
      data: userInfo,
      message: "data fetched",
    });
  }
);
