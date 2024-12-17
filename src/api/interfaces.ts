export class ResponseFormat {

    response : any
    status : number
    status_type:boolean

    constructor(response : any,status:number,type:boolean){

        this.response = response
        this.status = status
        this.status_type = type

    }

}

