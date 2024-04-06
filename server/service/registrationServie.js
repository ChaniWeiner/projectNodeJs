import 'dotenv/config'
import { executeQuery } from './query.js'

export class RegistrationService {

    async login(user) {
        const result = await executeQuery('SELECT id,name,username,phone,email FROM db_cs.users U, db_cs.passwords P WHERE U.id = P.userId && U.username=? && P.password=?',[user.username,user.password]);
        console.log("result login: "+result[0])   
        return result[0];
    }

}