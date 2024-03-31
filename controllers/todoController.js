import { TodoService } from '../service/todoService.js'

export default class TodoController {

    async getTodos(req, res, next) {
        try {
            const todoService = new TodoService();
            const data = await todoService.getAllTodos();
            return res.json(data);
        }
        catch (err) {
            return res.status(404).end(`${err}`)
        }

    }

    async getTodoById(req, res, next) {
        try {
            const todoService = new TodoService();
            const data = await todoService.getById(req.params.id);
            return res.json(data);
        }
        catch (err) {
            return res.status(404).end(`${err}`)
        }
 
    }

    async addTodo(req, res) {
        try {
            const todoService = new TodoService();
            await todoService.addTodo(req.body);
            res.status(200).json({ status: 200 });
        }
        catch (ex) {
            return res.status(500).end(`err=${ex}`)
            // const err = {}
            // err.status = 500;
            // err.message = ex;
            // next(err)
        }
    }
    async deleteTodo(req, res) {
        try {
            const todoService = new TodoService();
            await todoService.deleteTodo(req.params.id);
            res.json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            return res.status(500).end(`err=${ex}`)
            // const err = {}
            // err.statusCode = 500;
            // err.message = ex;
            // next(err)
        }
    }

    async updateTodo(req, res) {
        try {
            const todoService = new TodoService();
            await todoService.updateTodo(req.body,req.params.id);
            res.json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            return res.status(500).end(`${ex}`)
            // const err = {}
            // err.statusCode = 500;
            // err.message = ex;
            // next(err)
        }
    }
}