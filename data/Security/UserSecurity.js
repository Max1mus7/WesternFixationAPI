import bcrypt from  'bcrypt';

export default class UserSecurity {
    static async encryptPassword(password) {
        let salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    static async comparePassword(password1, password2) {
        return await bcrypt.compare(password1, password2);
    }
}