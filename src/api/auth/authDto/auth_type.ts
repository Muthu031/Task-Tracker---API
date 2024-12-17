export interface UserRegisterRes{
    message : string
    id: number
}

export interface UserRegisterReq{
    
    mobile_number : string;
    password : string;
    user_name: string;
    email_id: string;
    
}

export interface loginreq{
    mobile_number: string;
    password: string;
}

export class UserRegRes{
    id:number;
    message:string;
    token:string;
    constructor(id:number, message:string, token:string){
        this.id = id;
        this.message = message;
        this.token = token;
    }
}