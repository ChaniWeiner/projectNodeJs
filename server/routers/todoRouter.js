import express from "express";
import todoController from '../controllers/todoController.js'

const todoRouter = express.Router();

const todos = new todoController();

todoRouter.get("/:id",todos.getTodoById)
todoRouter.get("/",todos.getTodos);
todoRouter.post("/",todos.addTodo);
todoRouter.delete("/:id", todos.deleteTodo)
todoRouter.put("/:id", todos.updateTodo)

export {
    todoRouter
}