import { PasswordService } from '../service/passwordService.js'

export default class PasswordController {

    async getPasswords(req, res, next) {
        try {
            const passwordService = new PasswordService();
            const data = await passwordService.getAllPasswords();
            return res.json(data);
        }
        catch (err) {
            return res.status(404).end(`${err}`)
        }

    }

    async getPasswordById(req, res, next) {
        try {
            console.log(req.params.id)
            const passwordService = new PasswordService();
            const data = await passwordService.getById(req.params.id);
            console.log(data)
            return res.json(data);
        }
        catch (err) {
            return res.status(404).end(`${err}`)
        }
    }

    async getPasswordByPasswordname(req, res, next) {
        try {
            const passwordService = new PasswordService();
            const data = await passwordService.getByPasswordname(req.query.passwordname);
            return res.json(data);
        }
        catch (err) {
            return res.status(404).end(`${err}`)
        }
    }

    async addPassword(req, res) {
        try {
            console.log("pswd req.body= "+req.body.password+" "+req.body.userId+" "+req.body)
            const passwordService = new PasswordService();
            let response = await passwordService.loginVerify(req.body);
            if (response[0].userId != req.body.userId) {
                console.log("hey hop error in controller")
                return res.status(500).end("user not found")
            }
            else {
                return res.status(200).end(`user found!`);
            }
        }
        catch (ex) {
            return res.status(500).end(`${ex}`)
            // const err = {}
            // err.status = 500;
            // err.message = ex;
            // next(err)
        }
    }
    async deletePassword(req, res) {
        try {
            const passwordService = new PasswordService();
            await passwordService.deletePassword(req.params.id);
            res.status(200).end(`password with id: ${req.params.id} deleted succefuly`);
        }
        catch (ex) {
            return res.status(500).end(`err=${ex}`)
            // const err = {}
            // err.statusCode = 500;
            // err.message = ex;
            // next(err)
        }
    }

    async updatePassword(req, res) {
        try {
            const passwordService = new PasswordService();
            await passwordService.updatePassword(req.body, req.params.id);
            res.status(200).end(`password with id: ${req.params.id} updated succefuly`);
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