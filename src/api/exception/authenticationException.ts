class AuthenticationException extends Error{
    constructor(message: string){
        super(message);
        this.message= message;
        this.name = "InvalidCredential";
    }
}
export default AuthenticationException;