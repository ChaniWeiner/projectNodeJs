import 'dotenv/config'
import { query } from './query.js'

export class UserService {

    async getAllUsers() {
        const result = await query('select * from `db_cs`.`users`');
        return result;
    }
    async getById(id) {
        const result = await query('select * from `db_cs`.`users` where id=?', [id]);
        return result;
    }
    async addUser(user) {
        const result = await query('INSERT INTO `db_cs`.`users` (`id`, `name`, `username`, `phone`, `email`) VALUES (?, ?, ?, ?, ?)', [user.id, user.name, user.username, user.phone, user.email]);
        return result;
    }
}