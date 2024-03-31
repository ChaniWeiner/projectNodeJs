import { getAllPepole,getById } from '../service/pepoleService.js'

export default class PepoleController {

    async getPepole(req, res, next) {
        try {

            const data = await getAllPepole();
            return res.json(data);
        }
        catch (err) {
            return res.statusCode(404).end("err")
        }

    }

    async getPepoleById(req, res, next) {
        try {
            const data = await getById(req.params.id);
            return res.json(data);
        }
        catch (err) {
            return res.statusCode(404).end("err")
        }

    }
}