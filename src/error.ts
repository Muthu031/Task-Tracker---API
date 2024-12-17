import { Response } from "express";

import BadRequestException from "./api/exception/badRequestException";
import NotFoundException from "./api/exception/notFoundException";
import AuthenticationException from "./api/exception/authenticationException";
const errorHandler = (err: Error, res?: Response): any => {
    console.error(err);
    if (res) {
      if (err instanceof NotFoundException) {
        return res
          .status(404)
          .json({ error_code: err.name, error_message: err.message,status: false });
      } else if (err instanceof AuthenticationException) {
        return res
          .status(401)
          .json({ error_code: err.name, error_message: err.message,status: false });
      } else if (err instanceof BadRequestException) {
        return res
          .status(400)
          .json({ error_code: err.name, error_message: err.message,status: false });
      } else {
        return res
          .status(500)
          .json({ error_code: err.name, error_message: err.message,status: false });
      }
    }
  };

export default errorHandler;
