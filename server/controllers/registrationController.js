import { RegistrationService } from '../service/registrationServie.js'

export default class RegistrationController {

    async login(req, res) {
        try {
            console.log("I'm here login")
            const regService = new RegistrationService();
            let result = await regService.login(req.body);
            console.log("result in control:" + result + result.id+result.phone)
            if (result == null)
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

}