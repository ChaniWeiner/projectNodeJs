import 'dotenv/config'
import { executeQuery } from './query.js'

export class Service {
    async getAll(tableName) {
        const result = await executeQuery(`select * from ${process.env.DB_NAME}.${tableName}`);
        return result;
    }
    async getById(id, tableName) {
        const result = await executeQuery(`select * from ${process.env.DB_NAME}.${tableName} where id=?`, [id]);
        return result;
    }
    async getByParameter(type, parameter, tableName) {
        const result = await executeQuery(`select * from ${process.env.DB_NAME}.${tableName} where ${type}=?`, [parameter]);
        return result;
    }
    async add(tableName, questionMark) {
        // console.log(user)
        const result = await executeQuery(`INSERT INTO ${process.env.DB_NAME}.${tableName} VALUES ?`, [questionMark]);
        return result;
    }
    async delete(tableName, id) {
        const result = await executeQuery(`DELETE from ${process.env.DB_NAME}.${tableName} where id=?`, [id]);
        return result;
    }
    async update(tableName, keys, id) {
        const result = await executeQuery(`UPDATE ${process.env.DB_NAME}.${tableName} SET ${keys} WHERE ('id' = ?)`, [, id]);
        return result;
    }
}