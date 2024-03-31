import { CommentService } from '../service/commentService.js'

export default class CommentController {

    async getcomment(req, res, next) {
        try {
            const commentService = new CommentService();
            const data = await commentService.getAllComment();
            return res.json(data);
        }
        catch (err) {
            return res.status(404).end(`${err}`)
        }

    }

    async getcommentById(req, res, next) {
        try {
            const commentService = new CommentService();
            const data = await commentService.getById(req.params.id);
            return res.json(data);
        }
        catch (err) {
            return res.status(404).end(`${err}`)
        }
 
    }

    async addcomment(req, res) {
        try {
            const commentService = new CommentService();
            await commentService.addComment(req.body);
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
    async deletecomment(req, res) {
        try {
            const commentService = new CommentService();
            await commentService.deleteComment(req.params.id);
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

    async updatecomment(req, res) {
        try {
            const commentService = new CommentService();
            await commentService.updatecomment(req.body,req.params.id);
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