import 'dotenv/config'
import { executeQuery } from './query.js'

export class TodoService {
    async getAllTodos() {
        const result = await executeQuery(`select * from ${process.env.DB_NAME}.todos`);
        return result;
    }
    async getById(id) {
        const result = await executeQuery('select * from `db_cs`.`todos` where id=?', [id]);
        return result;
    }
    async getByUserId(userId){
        const result = await executeQuery('select * from `db_cs`.`todos` where userId=?', [userId]);
        return result;
    }
    async addTodo(todo) {
        const result = await executeQuery('INSERT INTO `db_cs`.`todos` (`id`, `userId`, `title`, `completed`) VALUES (?, ?, ?, ?)', [null, todo.userId, todo.title, todo.completed]);
        return result;
    }
    async deleteTodo(id) {
        const result = await executeQuery('DELETE from `db_cs`.`todos` where id=?', [id]);
        return result;
    }
    async updateTodo(todo,id) {
        const result = await executeQuery('UPDATE `db_cs`.`todos` SET `title`=?,`completed`=? WHERE (`id` = ?)',[todo.title, todo.completed,id]);
        return result;
    }
}