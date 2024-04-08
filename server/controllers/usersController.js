import { Service } from '../service/generyService.js';

export default class UsersController {

    async getUserById(req, res, next) {
        try {
            const service = new Service();
            const data = await service.getById('users',req.params.id);
            return res.json(data);  
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getUserByUsername(req, res, next) {
        try {
            console.log("The username in query: " + req.query.username)
            const service = new Service();
            const data = await service.getByParameter('users','username',req.query.username);
            console.log("Hi data:"+data.name)
            if (data[0]===undefined||data.length == 0) {
                return res.json({ status: 404, data: null })
            }
            console.log("ggggg " + data.name)
            return res.json({ status: 200, data: data[0] });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 404;
            err.message = ex;
            next(err)
        }
    }

    async deleteUser(req, res,next) {
        try {
            const service = new Service();
            await service.delete('users',req.params.id);
            res.status(200).end(`user with id: ${req.params.id} deleted succefuly`);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateUser(req, res,next) {
        try {
            const service = new Service();
            await service.update('users',req.body, req.params.id);
            res.status(200).end(`user with id: ${req.params.id} updated succefuly`);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}