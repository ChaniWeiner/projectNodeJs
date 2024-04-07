import 'dotenv/config'
import { executeQuery } from './query.js'

export class PasswordService {
    async getAllPasswords() {
        const result = await executeQuery(`select * from ${process.env.DB_NAME}.passwords`);
        return result;
    }
    async getById(id) {
        const result = await executeQuery('select * from `db_cs`.`passwords` where userId=?', [id]);
        return result;
    }
    async addPassword(password) {
        console.log(password)
        const result = await executeQuery('INSERT INTO `db_cs`.`passwords` (`userId`, `password`) VALUES (?, ?)', [password.userId, password.password])
    }
    async loginVerify(user) {
        const result = await executeQuery('select * from `db_cs`.`passwords` where userId=? && password=?', [user.userId, user.password]);
        return result;
    }
    async deletePassword(id) {
        const result = await executeQuery('DELETE from `db_cs`.`passwords` where id=?', [id]);
        return result;
    }
    async updatePassword(password, id) {
        console.log("pswd got: "+password)
        const result = await executeQuery('UPDATE `db_cs`.`passwords` SET `password`=? WHERE (`userId` = ?)', [password, id]);
        return result;
    }
}