import express from "express";
import passwordController from '../controllers/passwordController.js'

const passwordRouter = express.Router();

const password = new passwordController();

passwordRouter.get("/:id",password.getPasswordById)
// passwordRouter.get("/",password.getPassword);
passwordRouter.get("/",password.getPasswordById)
// passwordRouter.post("/",password.addPassword);
passwordRouter.delete("/:id", password.deletePassword)
passwordRouter.put("/:id", password.updatePassword)

export {
    passwordRouter
}