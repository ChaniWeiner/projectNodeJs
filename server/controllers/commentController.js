import { Service } from '../service/generyService.js';

export default class CommentController {

    async getCommentByPostId(req, res, next) {
        try {
            const service = new Service();
            console.log(req.query)
            const data = await service.getByParameter('comments','postId',req.query.postId);
            return res.json(data);
        }
        catch (err) {
            return res.status(404).end(`${err}`)
        }
    }

    async getCommentById(req, res, next) {
        try {
            const service = new Service();
            const data = await service.getById('comments',req.params.id);
            return res.json(data);
        }
        catch (err) {
            return res.status(404).end(`${err}`)
        }

    }

    async addComment(req, res) {
        try {
            const service = new Service();
            let result=await service.add('comments',req.body);
            return res.status(201).json({id: result.insertId});
        }
        catch (ex) {
            return res.status(500).end(`${ex}`)
            // const err = {}
            // err.status = 500;
            // err.message = ex;
            // next(err)
        }
    }
    async deleteComment(req, res) {
        try {
            const service = new Service();
            await service.delete('comments',req.params.id);
            res.status(200).end(`Comment with id: ${req.params.id} deleted succefuly`);
        }
        catch (ex) {
            return res.status(500).end(`err=${ex}`)
            // const err = {}
            // err.statusCode = 500;
            // err.message = ex;
            // next(err)
        }
    }

    async updateComment(req, res) {
        try {
            const service = new Service();
            console.log("in controller: "+req.params.id+" body: "+req.body.name)
            await service.update('comments',req.body, req.params.id);
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