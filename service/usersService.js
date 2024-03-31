import 'dotenv/config'
import { executeQuery } from './query.js'

export class UserService {
    async getAllUsers() {
        const result = await executeQuery(`select * from ${process.env.DB_NAME}.users`);
        return result;
    }
    async getById(id) {
        const result = await executeQuery('select * from `db_cs`.`users` where id=?', [id]);
        return result;
    }
    async addUser(user) {
        const result = await executeQuery('INSERT INTO `db_cs`.`users` (`id`, `name`, `username`, `phone`, `email`) VALUES (?, ?, ?, ?, ?)', [user.id, user.name, user.username, user.phone, user.email]);
        return result;
    }
    async deleteUser(id) {
        const result = await executeQuery('DELETE from `db_cs`.`users` where id=?', [id]);
        return result;
    }
    async updateUser(user,id) {
        const result = await executeQuery('UPDATE `db_cs`.`users` SET `name`=?, `username` = ?,`phone`=?,`email`=? WHERE (`id` = ?)',[user.name, user.username, user.phone, user.email,id]);
        return result;
    }
}