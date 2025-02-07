import { getTaskData } from "./task_service";
import { Request, Response,NextFunction } from "express";

class TaskCalculator {
  constructor() {

  }
  getMonthlyTaskCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
 
      return await getTaskData(req, res, next);

    } catch (error) {
      console.log("------------getMonthlyTaskCount------------", error);
      return error;

    }
  };

}

export default TaskCalculator;