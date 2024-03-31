import express from "express";
import commentController from '../controllers/commentController.js'

const commentRouter = express.Router();

const comment = new commentController();

commentRouter.get("/:id",comment.getcommentById)
commentRouter.get("/",comment.getcomment);
commentRouter.post("/",comment.addcomment);
commentRouter.delete("/:id", comment.deletecomment)
commentRouter.put("/:id", comment.updatecomment)

export {
    commentRouter
}