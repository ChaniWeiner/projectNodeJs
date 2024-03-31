import 'dotenv/config'
import { executeQuery } from './query.js'

export class Postervice {
    async getAllPost() {
        const result = await executeQuery(`select * from ${process.env.DB_NAME}.post`);
        return result;
    }
    async getById(id) {
        const result = await executeQuery('select * from `db_cs`.`post` where id=?', [id]);
        return result;
    }
    async addPost(post) {
        const result = await executeQuery('INSERT INTO `db_cs`.`post` (`id`, `userId`, `title`, `body`) VALUES (?, ?, ?, ?)', [post.id, post.userId, post.title, post.body]);
        return result;
    }
    async deletePost(id) {
        const result = await executeQuery('DELETE from `db_cs`.`post` where id=?', [id]);
        return result;
    }
    async updatePost(post,id) {
        const result = await executeQuery('UPDATE `db_cs`.`post` SET `userId`=?, `title` = ?,`body`=? WHERE (`id` = ?)',[post.userId, post.title, post.body,id]);
        return result;
    }
}