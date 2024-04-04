import 'dotenv/config'
import { executeQuery } from './query.js'

export class PostService {
    async getAllPost() {
        const result = await executeQuery(`select * from ${process.env.DB_NAME}.posts`);
        return result;
    }
    async getById(id) {
        const result = await executeQuery('select * from `db_cs`.`posts` where id=?', [id]);
        return result;
    }
    async getByUserId(userId) {
        const result = await executeQuery('select * from `db_cs`.`posts` where userId=?', [userId]);
        return result;
    }
    async addPost(post) {
        const result = await executeQuery('INSERT INTO `db_cs`.`posts` (`id`, `userId`, `title`, `body`) VALUES (?, ?, ?, ?)', [null, post.userId, post.title, post.body]);
        return result;
    }
    async deletePost(id) {
        const result = await executeQuery('DELETE from `db_cs`.`posts` where id=?', [id]);
        return result;
    }
    async updatePost(post,id) {
        const result = await executeQuery('UPDATE `db_cs`.`posts` SET `title` = ?,`body`=? WHERE (`id` = ?)',[ post.title, post.body,id]);
        return result;
    }
}