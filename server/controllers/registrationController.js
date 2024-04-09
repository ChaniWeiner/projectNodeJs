import { RegistrationService } from '../service/registrationServie.js'
import { Service } from '../service/generyService.js';

export default class RegistrationController {

    async login(req, res,next) {
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
            const err = {}
            err.status = 500;
            err.message = ex;
            next(err)
        }
    }
    async register(req, res,next) {
        try {
            const service = new Service();
            let result = await service.add('users',req.body[0]);
            let pswd = req.body[1]
            let user = req.body[0]
            user.id = result.insertId
            pswd.userId = result.insertId
            await service.add('passwords',pswd)
            return res.status(201).json({ user: user });
        }  
        catch (ex) {
            const err = {}
            err.status = 500;
            err.message = ex;
            next(err)
        }
    }
}