import { connection } from "../DBAccess/DAOConfig.js";
import UserSecurity from "../Security/UserSecurity.js";
import UserValidation from "../Validation/userValidation.js";

export default class userDAO {
    async getAll(){
        let resultObj;
        try {
            const result =
                await connection.query`SELECT * FROM WFDB.users`;
            resultObj = { code: 200, queryResult: result.recordsets[0] };
        } catch (err) {
            // if (err.name == 'DataError') {
            //     resultObj = {
            //         code: err.code,
            //         errorType: err.errorType,
            //         message: err.message,
            //     };
            // } else {
                resultObj = { code: 500, message: err.message };
            // }
        } finally {
            return resultObj;
        }
    }

    async authenticate(user){
        let resultObj;
        try{
            const result = await connection.query`SELECT * FROM WFDB.users WHERE username = ${user.username}`;
            UserSecurity.checkUserExists(result.recordsets[0][0]);
            await UserSecurity.comparePassword(user.password, result.recordsets[0][0].Password);
            resultObj = { code: 200, message: 'Login Successful'};
        } catch(err){
            resultObj = { code: 500, message: err.message };
        }
        finally{
            return resultObj;
        }
    }

    async getOne(id){
        let resultObj;
        try{
            const result = await connection.query`SELECT * FROM WFDB.users WHERE id = ${id}`;
            resultObj = { code: 200, queryResult: result.recordsets[0] };
        }
        catch(err){
            resultObj = { code: 500, message: err.message };
        }
        finally{
            return resultObj;
        }
    }

    async getByUsername(username){
        let resultObj;
        try{
            const result = await connection.query`SELECT * FROM WFDB.users WHERE username = ${username}`;
            resultObj = { code: 200, queryResult: result.recordsets[0] };
        }
        catch(err){
            resultObj = { code: 500, message: err.message };
        }
        finally{
            return resultObj;
        }
    }

    async create(user){
        let resultObj;
        try{
            user.password = await UserSecurity.encryptPassword(user.password);
            //console.log(user);
            const result = await connection.query`INSERT INTO WFDB.users (username, password, email, role) VALUES (${user.username}, ${user.password}, ${user.email}, ${user.role})`;
            resultObj = { code: 201, queryResult: result.recordsets[0] };
        }
        catch(err){
            resultObj = { code: 500, message: err.message };
        }
        finally{
            return resultObj;
        }
    }

    async update(id, user){
        let resultObj;
        try{
            const result = await connection.query`UPDATE WFDB.users SET username = ${user.username}, password = ${user.password}, email = ${user.email}, role = ${user.role} WHERE id = ${id}`;
            resultObj = { code: 200, queryResult: result.recordsets[0] };
        }
        catch(err){
            resultObj = { code: 500, message: err.message };
        }
        finally{
            return resultObj;
        }
    }

    async delete(id){
        let resultObj;
        try{
            const result = await connection.query`DELETE FROM WFDB.users WHERE id = ${id}`;
            resultObj = { code: 200, queryResult: result.recordsets[0] };
        }
        catch(err){
            resultObj = { code: 500, message: err.message };
        }
        finally{
            return resultObj;
        }
    }
}