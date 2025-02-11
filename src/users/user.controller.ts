import expressAsyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import { AppDataSource } from "../services/database.service";
import { User } from "./user.schema";
import { Profile } from "./profile.schema";

const userRepo = AppDataSource.getRepository(User);
const profileRepo = AppDataSource.getRepository(Profile)

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



//  one to one relation is established between user and profile;
// insert profile data along with userdata  cause both are connected to each other;
export const insertProfile = expressAsyncHandler(async (req: Request, res: Response) => {
  let profile: Profile = new Profile();
  profile.number = 945125;
  profile.gender = "female";
  profile.photos = "photo3";
  // const profileInserted = await profileRepo.save(profile);

  //  here we can clearly see that we are hitting backend two time  , 1st when we need to save the profile and 2nd when we need to save user data;

  //  but it is not a good practice ,here we only have to hit only one request to backend and save both data at once;

  //  so here we need to use cascade option where we have build the connection ;


  let user: User = new User();
  user.firstName = "akshita";
  user.lastname = "chadda";
  user.email = "akshu@gmail.com";
  user.password = "akshupass";
  user.profile = profile;

  //  now  we are hitting database only one time ;ß
  let userInserted = await userRepo.save(user);

  //send response;
  res.status(201).json({
    data: userInserted,
    message: "user profile inserted"
  })
});


//  now get usedata from both relations;
export const getAllData = expressAsyncHandler(
  async (req: Request, res: Response) => {

    // but if use eager then we do not need to define it here; 
    const userInfo = await userRepo.find();

    // if we don't use eager option in profile schema then here we need to define from which table we need to fetch data; like this :

    // const userInfo = await userRepo.find({ relations: { profile: true } })

    res.status(201).json({
      data: userInfo,
      message: "data fetched",
    });
  }
);

//  update  data in both relations;
export const updateData = expressAsyncHandler
  (async (req: Request, res: Response) => {

    // first get user data ;
    const userData = await userRepo.findOne({ where: { id: 2 } })
    let updatedData;
    //  update data now ;
    if (userData) {
      userData.firstName = "test";
      userData.lastname = "test2";
      userData.email = "testemail@gmail.com";
      userData.password = "testpass";
      updatedData = await userRepo.save(userData);

      //  updata profile;
      userData.profile.gender = "male hi h";
      userData.profile.number = 77777;
      userData.profile.photos = "photo5";
    } else {
      res.status(404).json({
        message: "data not found"
      })
    }

    // send success response;
    res.status(201).json({
      data: updatedData,
      message: "data updated"
    })


  })


//  delete data from both tabel ,
//   by default we all know that their exist a foreign key constraints between two tables;
//  so if we delete data from user table then it will automatically delete data from profile table but if we delete profile then it won't allow me to delete it , so we need to use  ondelete :cascade option to make it happpen where we define the relation;

export const deleteProfile = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const deletedProfile = await profileRepo.delete({ id: 2 });

    res.status(201).json({
      data: deletedProfile,
      message: "profile deleted",
    });
  }
);

