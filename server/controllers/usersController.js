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
            console.log(err)
            return res.status(500).end(`${err}`)
        }

    }
    
    async getUserByUsername(req, res, next) {
        try {
            console.log("The username in query: "+req.query.username)
            const userService = new UserService();
            const data = await userService.getByUsername(req.query.username);
            if(data==null){
                return res.status(500).end("user not found");
            }
            console.log("ggggg "+data.name)
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
            res.status(200).end(`user with id: ${req.body.id} added succefuly`);
        }
        catch (ex) {
            return res.status(500).end(`${ex}`)
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
            res.status(200).end(`user with id: ${req.params.id} deleted succefuly`);
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
            await userService.updateUser(req.body, req.params.id);
            res.status(200).end(`user with id: ${req.params.id} updated succefuly`);
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