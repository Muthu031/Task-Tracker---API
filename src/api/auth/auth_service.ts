import { Request, Response,NextFunction } from "express";
import  User  from "../database/models/user";
import AuthenticationException from "../exception/authenticationException";
import { loginreq } from "./authDto/auth_type";
import jwt, { Secret } from "jsonwebtoken";
import errorHandler from "../../error";
const SECRET_KEY: Secret = 'PASSWORD';
export async function userLoginData(request :loginreq){
    try{
        const mobile_number = request.mobile_number;
           const exist = await User.findOne({where:{mobile_number}})
          if(!exist) throw new Error("you not have an account. please go and register");
        return generateToken(mobile_number);

    }catch(err){
        throw err;
    }
}

export async function generateToken(mobileNumber: String) {
    let token
    try {
      console.log("generate token for given mobile number:", mobileNumber);
      const token = jwt.sign({ mobile_number: mobileNumber }, SECRET_KEY, {
        expiresIn: `${10}d`
      });
      console.log("Token"+token);
      return token;
    } catch (err) {
      throw err;
    }
  };

  export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Log to track the flow
      console.log("Validate token from header and then call the corresponding API");
  
      // Get the token from the request header
      const token = req.header("Authorization")?.replace("Bearer ", "");
      
      // If token is not provided, throw an exception
      if (!token) {
        throw new AuthenticationException("Authentication token is required");
      }
  
      // Verify the token using the secret key
      const decoded: any = jwt.verify(token, SECRET_KEY);
  
      // Call the next middleware or route handler
      next();
    } catch (err) {
      // Handle errors and pass to the error handler
      return errorHandler(err, res);
    }
  };