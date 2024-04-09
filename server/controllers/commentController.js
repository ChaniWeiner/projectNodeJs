import { Service } from '../service/generyService.js';

export default class CommentController {

    async getCommentByPostId(req, res, next) {
        try {
            const service = new Service();
            const data = await service.getByParameter('comments', 'postId', req.query.postId);
            return res.status(200).json(data);
        }
        catch (ex) {
          const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getCommentById(req, res, next) {
        try {
            const service = new Service();
            const data = await service.getById('comments', req.params.id);
            return res.json(data);
        }
        catch (ex) {
             const err = {}
            err.statusCode = 404;
            err.message = ex;
            next(err)
        }

    }

    async addComment(req, res,next) {
        try {
            const service = new Service();
            let result = await service.add('comments', req.body);
            return res.status(201).json({ id: result.insertId });
        }
        catch (ex) {
            const err = {}
            err.status = 500;
            err.message = ex;
            next(err)
        }
    }
    async deleteComment(req, res,next) {
        try {
            const service = new Service();
            await service.delete('comments', req.params.id,'email',req.body.email);
            res.status(200).end(`Comment with id: ${req.params.id} deleted succefuly`);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateComment(req, res,next) {
        try {
            const service = new Service();
            await service.update('comments', req.body,null, req.params.id);
            return res.json({ status: 200, data: req.body });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}