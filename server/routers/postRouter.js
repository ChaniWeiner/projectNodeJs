import express from "express";
import postController from '../controllers/postController.js'

const postRouter = express.Router();

const post = new postController();

postRouter.get("/:id",post.getPostById)
// postRouter.get("/",post.getPost);
postRouter.get("/",post.getPostByUserId);
postRouter.post("/",post.addPost);
postRouter.delete("/:id", post.deletePost)
postRouter.put("/:id", post.updatePost)

export {
    postRouter
}