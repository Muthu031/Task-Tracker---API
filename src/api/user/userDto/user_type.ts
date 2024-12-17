import Task from "../../../api/database/models/task"


export class AddTask {
    
    public user_key: number
    public description: string
    public status: string
    

    constructor(
        product :Task
    ){

        this.user_key = product.user_key
        this.description = product.description
        this.status = product.status
     
    }
}