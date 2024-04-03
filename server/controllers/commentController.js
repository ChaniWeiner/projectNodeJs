import { CommentService } from '../service/commentService.js'

export default class CommentController {

    async getComment(req, res, next) {
        try {
            const commentService = new CommentService();
            const data = await commentService.getAllComment();
            return res.json(data);
        }
        catch (err) {
            return res.status(404).end(`${err}`)
        }

    }

    async getCommentByPostId(req, res, next) {
        try {
            const commentService = new CommentService();
            console.log(req.query)
            const data = await commentService.getByPostId(req.query.postId);
            return res.json(data);
        }
        catch (err) {
            return res.status(404).end(`${err}`)
        }
    }

    async getCommentById(req, res, next) {
        try {
            const commentService = new CommentService();
            const data = await commentService.getById(req.params.id);
            return res.json(data);
        }
        catch (err) {
            return res.status(404).end(`${err}`)
        }

    }

    async addComment(req, res) {
        try {
            const commentService = new CommentService();
            await commentService.addComment(req.body);
            res.status(200).end(`Comment added succefuly`);
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
            const commentService = new CommentService();
            await commentService.deleteComment(req.params.id);
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
            const commentService = new CommentService();
            console.log("in controller: "+req.params.id+" body: "+req.body.name)
            await commentService.updateComment(req.body, req.params.id);
            res.status(200).end(`Comment with id: ${req.params.id} updated succefuly`);
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