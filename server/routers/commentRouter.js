import express from "express";
import commentController from '../controllers/commentController.js'

const commentRouter = express.Router();

const comment = new commentController();

commentRouter.get("/:id",comment.getCommentById)
commentRouter.get("/",comment.getComment);
commentRouter.get("/",comment.getCommentByPostId)
commentRouter.post("/",comment.addComment);
commentRouter.delete("/:id", comment.deleteComment)
commentRouter.put("/:id", comment.updateComment)

export {
    commentRouter
}