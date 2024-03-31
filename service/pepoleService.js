import 'dotenv/config'
import { query } from './query.js'

async function getAllPepole() {
    const result = await query('select * from `db_s&c`.`pepole`');
    return result;
}
async function getById(id) {
    const result = await query('select * from `db_s&c`.`pepole` where id=?',[id]);
    return result;
}

export {
    getAllPepole,getById
}