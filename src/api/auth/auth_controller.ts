import { Request, Response,NextFunction } from "express";
import  User  from "../database/models/user";
import { ResponseFormat } from "../interfaces";
import { loginreq, UserRegisterRes, UserRegisterReq, UserRegRes } from "./authDto/auth_type";
import { userLoginData } from "./auth_service";
import errorHandler from "../../error";




class AuthController {

    constructor() {}
    login = async (req: Request, res: Response) => {
        const request :loginreq = req.body
        try {
           if(!request.mobile_number || !request.password){
            const userResponse: UserRegisterRes = {
                message: "Missing required fields!",
                id: 0,
            };
              const  response = new ResponseFormat( userResponse,500,false)
             return res.status(500).json(response);
           }

           const userLogin = await userLoginData(request);
           const response:UserRegRes = {
                  id :1,
                  message:"User successfully Login",
                  token:userLogin
           }
               res.status(200).json({response})

            
        } catch (err) {
            console.log("------------Login------------",err);
            return errorHandler(err, res);
        }
    }
    // user registration
    register = async (req: Request, res: Response) => {
        const request:UserRegisterReq = req.body;

        try {
            if (!request.mobile_number || !request.password || !request.user_name) {
                const userResponse: UserRegisterRes = {
                  message: "Missing required fields!",
                  id: 0,
              };
                const  response = new ResponseFormat( userResponse,500,false)
               return res.status(500).json(response);
                 
              }
            const mobile_number = request.mobile_number
            // Check if the user already exists
            const exist = await User.findOne({ where: { mobile_number } });
            if (exist) {
                const userResponse: UserRegisterRes = {
                    message: 'User already exists',
                    id: 0,
                };
                  const  response = new ResponseFormat( userResponse,201,true)
                return res.status(201).json({ response }); // 400 Bad Request
            }
            // Create a new user
            const user = await User.create({
                mobile_number,
                password:request.password,
                user_name:request.user_name,
                email_id:request.email_id,
                created_at: new Date(),
                updated_at: new Date()
            });

            console.log('User created:', user);

            const userResponse: UserRegisterRes = {
                message: 'user registered successfully',
                id: user.user_key,
            };
              const  response = new ResponseFormat( userResponse,200,true)
            return res.status(200).json({ response }); 
           
            

        } catch (err) {
            console.error('Error during registration:', err);
            const userResponse: UserRegisterRes = {
                message: 'Internal server error',
                id: 0,
            };
              const  response = new ResponseFormat( userResponse,200,true)
            return res.status(200).json({ response }); 
          
        }
    }
    
}

export default AuthController;