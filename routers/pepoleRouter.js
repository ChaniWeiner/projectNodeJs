import express from "express";
import pepoleController from '../controllers/pepoleController.js'

const pepoleRouter = express.Router();

const pepole = new pepoleController();

pepoleRouter.get("/:id",pepole.getPepoleById)

pepoleRouter.get("/",pepole.getPepole);

export {
    pepoleRouter
}