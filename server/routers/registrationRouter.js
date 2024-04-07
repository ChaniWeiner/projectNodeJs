import express from "express";
import registrationController from '../controllers/registrationController.js'

const regRouter = express.Router();

const reg = new registrationController();

// postRouter.get("/",reg.getPostByUserId);
regRouter.post("/login",reg.login);
regRouter.post("/register",reg.register);

export {
    regRouter
}