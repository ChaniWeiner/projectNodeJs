import 'dotenv/config'
import { executeQuery } from './query.js'

export class CommentService {
    async getAllComment() {
        const result = await executeQuery(`select * from ${process.env.DB_NAME}.comments`);
        return result;
    }
    async getById(id) {
        const result = await executeQuery('select * from `db_cs`.`comments` where id=?', [id]);
        return result;
    }
    async getByPostId(postId){
        const result = await executeQuery('select * from `db_cs`.`comments` where postId=?', [postId]);
        return result;
    }
    async addComment(comment) {
        const result = await executeQuery('INSERT INTO `db_cs`.`comments` (`id`, `postId`, `name`, `email`,`body`) VALUES (?, ?, ?, ?,?)', [comment.id, comment.postId, comment.name,comment.email, comment.body]);
        return result;
    }
    async deleteComment(id) {
        const result = await executeQuery('DELETE from `db_cs`.`comments` where id=?', [id]);
        return result;
    }
    async updateComment(comment,id) {
        const result = await executeQuery('UPDATE `db_cs`.`comments` SET `name` = ?, `email` = ?,`body`=? WHERE (`id` = ?)',[ comment.name,comment.email, comment.body,id]);
        return result;
    }
}