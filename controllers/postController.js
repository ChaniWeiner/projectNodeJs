import { PostService } from '../service/postService.js'

export default class PostController {

    async getPost(req, res, next) {
        try {
            const postervice = new PostService();
            const data = await postervice.getAllPost();
            return res.json(data);
        }
        catch (err) {
            return res.status(404).end(`${err}`)
        }

    }

    async getPostById(req, res, next) {
        try {
            const postervice = new PostService();
            const data = await postervice.getById(req.params.id);
            return res.json(data);
        }
        catch (err) {
            return res.status(404).end(`${err}`)
        }
 
    }

    async addPost(req, res) {
        try {
            const Postervice = new PostService();
            await Postervice.addPost(req.body);
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
    async deletePost(req, res) {
        try {
            const Postervice = new PostService();
            await Postervice.deletePost(req.params.id);
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

    async updatePost(req, res) {
        try {
            const Postervice = new PostService();
            await Postervice.updatePost(req.body,req.params.id);
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