import { Request, Response } from "express";
import { AddTask } from "./userDto/user_type";
import { addTaskDetail,  deleteTaskFunction,  listAllTaskFunction,  updateTaskInDatabase } from "./user_service";
import { ResponseFormat } from "../interfaces";
class  UserController{
    constructor(){}

// Task adder 
addTask = async (req:Request,res:Response,) => {
    const request : AddTask = req.body;
    try{
         const responseData = await addTaskDetail(request);
         const task_id = responseData.task_id;
        res.status(200).json({message:'Task successfully added',task_id});
    }catch(err){
       console.log("-----------add Task--------------",err);
       res.status(500).json({message:'internal server issue'});
    }

}
// task update
 updateTask = async (req:Request, res:Response) => {
    try {
        const response = await updateTaskInDatabase(req);
        if (response === null) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task successfully updated' });
    } catch (err) {
        console.log("-----------updateTask--------------", err);
        res.status(500).json({ message: 'Internal server issue' });
    }
};

// task deletion
deleteTask = async (req:Request, res:Response) => {
    try {
        const { task_id, user_key } = req.body;
        
        // Ensure body is provided
        if (!task_id || !user_key) {
            return res.status(404).json({ message: "Task_id & user_key not found" });
        }

        const deleteData = await deleteTaskFunction(task_id, user_key);
        
        if (deleteData === 0) {
            return res.status(404).json({ message: 'Task not found or already deleted' });
        }
        
        return res.status(200).json({ message: 'Task successfully deleted' });
    } catch (err) {
        console.error("-----------deleteTask--------------", err);
        return res.status(500).json({ message: 'Internal server issue' });
    }
};
// get list all task
listAllTask = async (req: Request, res: Response) => {
    try {
        const user_key = req.query.user_key as string;
        const status = req.query.status as string;
        const response = await listAllTaskFunction(user_key, status);
        const Data = new ResponseFormat(response, 200, true);
        return res.status(200).json(Data);
    } catch (err) {
        console.error("-----------listAllTask--------------", err);
        return res.status(500).json({ message: 'Internal server issue' });
    }
};


}
export default UserController;