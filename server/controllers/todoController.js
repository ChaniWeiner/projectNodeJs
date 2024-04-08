import { Service } from '../service/generyService.js';

export default class TodoController {

    async getTodoById(req, res, next) {
        try {
            const service = new Service();
            const data = await service.getById('todos',req.params.id);
            return res.json(data);
        }
        catch (err) {
            return res.status(404).end(`${err}`)
        }
    }

    async getTodosByUserId(req, res, next) {
        try {
            const service = new Service();
            const data = await service.getByParameter('todos','userId',req.query.userId);
            return res.json(data);
        }
        catch (err) {
            return res.status(404).end(`${err}`)
        }
    }

    async addTodo(req, res) {
        try {
            console.log(req.body)
            const service = new Service();
            let result=await service.add('todos',req.body);
            return res.status(201).json({id: result.insertId});
        }
        catch (ex) {
            console.log(ex)
            return res.status(500).end(`${ex}`)
            // const err = {}
            // err.status = 500;
            // err.message = ex;
            // next(err)
        }
    }
    async deleteTodo(req, res) {
        try {
            const service = new Service();
            await service.delete('todos',req.params.id);
            res.status(200).end(`Todo with id: ${req.params.id} deleted succefuly`);
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
            console.log(req.body)
            const service = new Service();
            await service.update('todos',req.body, req.params.id);
            return res.json({ status: 200, data: req.body });
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