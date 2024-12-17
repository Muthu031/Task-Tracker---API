class BadRequestException extends Error{
    constructor(message: string){
        super(message);
        this.message= message;
        this.name = "BadRequest";
    }
}
export default BadRequestException;