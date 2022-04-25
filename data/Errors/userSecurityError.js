export default class UserSecurityError extends Error {
    static LoginFailedError() {
        this.code = 401;
        this.errorType = 'LOGIN_FAILED';
        this.message = 'Login failed';
        return this;
    }
}