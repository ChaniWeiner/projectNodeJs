import { Service } from '../service/generyService.js';
export default class PostController {

    async getPosts(req, res, next) {
        try {
            console.log("I'm here get")
            console.log(req.query.userId)
            const service = new Service();
            let data = []
            if (req.query.userId === undefined) {
                data = await service.getAll('posts');
            }
            else {
                data = await service.getByParameter('posts','userId',req.query.userId);
            }
            return res.json(data);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 404;
            err.message = ex;
            next(err)
        }

    }

    async getPostById(req, res, next) {
        try {
            const service = new Service();
            const data = await service.getById('posts',req.params.id);
            return res.json(data);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 404;
            err.message = ex;
            next(err)
        }

    }

    async addPost(req, res,next) {
        try {
            console.log("I'm here add")
            const service = new Service();
            let result= await service.add('posts',req.body);
            return res.status(201).json({id: result.insertId});
        }
        catch (ex) {
            const err = {}
            err.status = 500;
            err.message = ex;
            next(err)
        }
    }
    async deletePost(req, res,next) {
        try {
            const service = new Service();
            await service.delete('posts',req.params.id);
            res.json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 200;
            err.message = ex;
            next(err)
        }
    }

    async updatePost(req, res,next) {
        try {
            const service = new Service();
            await service.update('posts',req.body,null, req.params.id);
            return res.json({ status: 200, data: req.body });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 200;
            err.message = ex;
            next(err)
        }
    }
}