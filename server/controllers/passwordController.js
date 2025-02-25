import { Service } from '../service/generyService.js';
export default class PasswordController {

    async getPasswordById(req, res, next) {
        try {
            console.log(req.params.id)
            const service = new Service();
            const data = await service.getByParameter('passwords','userId',req.params.id);
            console.log(data)
            return res.json(data);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 404;
            err.message = ex;
            next(err)
        }
    }

    async deletePassword(req, res,next) {
        try {
            const service = new Service();
            await service.deletePassword('passwords',req.params.id);
            res.status(200).end(`password with id: ${req.params.id} deleted succefuly`);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updatePassword(req, res,next) {
        try {
            const service = new Service();
            let curPswd = await service.getByParameter('passwords','userId',req.params.id,'userId')
            console.log("controller send pswd: "+req.body.newPswd+req.body.curPswd+curPswd[0].password)
            if (curPswd[0].password != req.body.curPswd) {
                return res.status(404).json({status:404})
            }
            let newPswd={password:req.body.newPswd}
            await service.update('passwords',newPswd,'userId', req.params.id);
            return res.status(200).json({status:200})
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}