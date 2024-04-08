import 'dotenv/config'
import { executeQuery } from './query.js'

export class Service {
    async getAll(tableName) {
        const result = await executeQuery(`select * from ${process.env.DB_NAME}.${tableName}`);
        return result;
    }
    async getById(tableName, id) {
        const result = await executeQuery(`select * from ${process.env.DB_NAME}.${tableName} where id=?`, [id]);
        return result;
    }
    async getByParameter(tableName, type, parameter,orderBy='id',limit=Number.MAX_SAFE_INTEGER) {
        console.log("the parameter:" + parameter)
        const result = await executeQuery(`select * from ${process.env.DB_NAME}.${tableName} where ${type}=? order by ${orderBy} limit ${limit}`, [parameter]);
        return result;
    }
    async add(tableName, item) {
        // console.log(user)
        const result = await executeQuery(`INSERT INTO ${process.env.DB_NAME}.${tableName} VALUES (${Object.keys(item).map(() => '?')})`, [...Object.values(item)]);
        return result;
    }
    async delete(tableName, id) {
        const result = await executeQuery(`DELETE from ${process.env.DB_NAME}.${tableName} where id=?`, [id]);
        return result;
    }
    async update(tableName, item, type, id) {
        if (type != null) {
            const result = await executeQuery(`UPDATE ${process.env.DB_NAME}.${tableName} SET ${Object.keys(item).map(column => column + '=?')} WHERE ${type}=?`, [...Object.values(item), id]);
        }
        const result = await executeQuery(`UPDATE ${process.env.DB_NAME}.${tableName} SET ${Object.keys(item).map(column => column + '=?')} WHERE id=?`, [...Object.values(item), id]);
        return result;
    }
}