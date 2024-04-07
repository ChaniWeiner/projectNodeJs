import { RegistrationService } from '../service/registrationServie.js'
import { UserService } from '../service/usersService.js';
import { PasswordService } from '../service/passwordService.js';

export default class RegistrationController {

    async login(req, res) {
        try {
            console.log("I'm here login")
            const regService = new RegistrationService();
            let result = await regService.login(req.body);
            console.log("result in control:" + result)
            if (result == undefined)
                return res.status(404).json({ status: 404 });
            return res.status(200).json({ status: 200, data: result });
        }
        catch (ex) {
            return res.status(500).end(`${ex}`)
            // const err = {}
            // err.status = 500;
            // err.message = ex;
            // next(err)
        }
    }
    async register(req, res) {
        try {
            const userService = new UserService();
            const passwordService = new PasswordService();
            let result = await userService.addUser(req.body[0]);
            console.log("resultttt" + result.insertId)
            let pswd = req.body[1]
            let user = req.body[0]
            user.id = result.insertId
            pswd.userId = result.insertId
            await passwordService.addPassword(pswd)
            return res.status(201).json({ user: user });
        }
        catch (ex) {
            return res.status(500).end(`${ex}`)
            // const err = {}
            // err.status = 500;
            // err.message = ex;
            // next(err)
        }
    }
}