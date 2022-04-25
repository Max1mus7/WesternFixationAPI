import bcrypt from  'bcrypt';
import UserSecurityError from '../Errors/userSecurityError.js';
export default class UserSecurity {
    static async encryptPassword(password) {
        let salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    static async comparePassword(password1, password2) {
        if(await bcrypt.compare(password1, password2)) {
            return true;
        }
        else{
            throw UserSecurityError.LoginFailedError();
        }
    }

    static checkUserExists(user) {
        if (user == undefined || user == null || user === {} || user === [] || (user.Username == undefined && user.Password == undefined && user.Email == undefined)) {
            //console.log('no info');
            throw UserSecurityError.LoginFailedError();
        }
    }
}