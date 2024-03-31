import { UserService } from '../service/usersService.js'

export default class UsersController {

    async getUsers(req, res, next) {
        try {
            const userService = new UserService();
            const data = await userService.getAllUsers();
            return res.json(data);
        }
        catch (err) {
            return res.status(404).end(`${err}`)
        }

    }

    async getUserById(req, res, next) {
        try {
            const userService = new UserService();
            const data = await userService.getById(req.params.id);
            return res.json(data);
        }
        catch (err) {
            return res.status(404).end(`${err}`)
        }
 
    }

    async addUser(req, res) {
        try {
            const userService = new UserService();
            await userService.addUser(req.body);
            res.status(200).json({ status: 200 });
        }
        catch (err) {
            return res.status(500).end(`err=${err}`)
            // const err = {}
            // err.status = 500;
            // err.message = ex;
            // next(err)
        }
    }
    async deleteUser(req, res) {
        try {
            const userService = new UserService();
            await userService.deleteUser(req.params.id);
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

    async updateUser(req, res) {
        try {
            const userService = new UserService();
            await userService.updateUser(req.body,req.params.id);
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