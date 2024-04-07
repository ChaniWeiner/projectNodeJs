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
    async getByUsername(username) {
        console.log("Hi I am in service " + username + " "+typeof username)
        const result = await executeQuery(`select * from \`db_cs\`.\`users\` where username='${username}'`);
        return result[0];
    }
    async addUser(user) {
        console.log(user)
        const result = await executeQuery('INSERT INTO `db_cs`.`users` (`id`, `name`, `username`, `phone`, `email`) VALUES (?, ?, ?, ?, ?)', [user.id, user.name, user.username, user.phone, user.email]);
        console.log(result+result.insertId)
        return result;
    }
    async deleteUser(id) {
        const result = await executeQuery('DELETE from `db_cs`.`users` where id=?', [id]);
        return result;
    }
    async updateUser(user, id) {
        const result = await executeQuery('UPDATE `db_cs`.`users` SET `name`=?, `username` = ?,`phone`=?,`email`=? WHERE (`id` = ?)', [user.name, user.username, user.phone, user.email, id]);
        return result;
    }
}