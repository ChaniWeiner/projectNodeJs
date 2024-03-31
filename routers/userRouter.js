import express from "express";
import usersController from '../controllers/usersController.js'

const userRouter = express.Router();

const users = new usersController();

userRouter.get("/:id",users.getUserById)

userRouter.get("/",users.getUsers);
userRouter.post("/",users.addUser);



export {
    userRouter
}