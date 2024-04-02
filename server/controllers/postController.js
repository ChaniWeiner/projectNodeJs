import { PostService } from '../service/postService.js'

export default class PostController {

    async getPost(req, res, next) {
        try {
            console.log("I'm here get")
            const postService = new PostService();
            const data = await postService.getAllPost();
            return res.json(data);
        }
        catch (err) {
            return res.status(404).end(`${err}`);
        }

    }

    async getPostById(req, res, next) {
        try {
            const postService = new PostService();
            const data = await postService.getById(req.params.id);
            return res.json(data);
        }
        catch (err) {
            return res.status(404).end(`${err}`)
        }

    }

    async getPostByUserId(req, res, next) {
        try {
            const postService = new PostService();
            const data = await postService.getByUserId(req.query.userId);
            return res.json(data);
        }
        catch (err) {
            return res.status(404).end(`${err}`)
        }
    }

    async addPost(req, res) {
        try {
            console.log("I'm here add")
            const postService = new PostService();
            await postService.addPost(req.body);
            res.status(200).end(`Post added succefuly`);
        }
        catch (ex) {
            return res.status(500).end(`${ex}`)
            // const err = {}
            // err.status = 500;
            // err.message = ex;
            // next(err)
        }
    }
    async deletePost(req, res) {
        try {
            const postService = new PostService();
            await postService.deletePost(req.params.id);
            res.json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            res.status(200).end(`Post with id: ${req.params.id} deleted succefuly`);
            // const err = {}
            // err.statusCode = 500;
            // err.message = ex;
            // next(err)
        }
    }

    async updatePost(req, res) {
        try {
            const postService = new PostService();
            await postService.updatePost(req.body, req.params.id);
            res.json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            res.status(200).end(`Post with id: ${req.params.id} updated succefuly`);
            // const err = {}
            // err.statusCode = 500;
            // err.message = ex;
            // next(err)
        }
    }
}