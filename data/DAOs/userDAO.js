import { connection } from "../DBAccess/DAOConfig.js";

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
}