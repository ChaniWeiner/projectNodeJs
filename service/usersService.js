import 'dotenv/config'
import { query } from './query.js'

export class UserService {

async  getAllUsers() {
    const result = await query('select * from `db_cs`.`users`');
    return result;
}
async  getById(id) {
    const result = await query('select * from `db_cs`.`users` where id=?',[id]);
    return result;
}

}