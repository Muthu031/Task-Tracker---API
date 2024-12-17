class NotFoundException extends Error{
    constructor(message: string){
        super(message);
        this.message= message;
        this.name = "NotFound";
    }
}
 
export default NotFoundException;