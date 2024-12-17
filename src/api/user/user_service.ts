import Task from "../database/models/task";
import { AddTask } from "./userDto/user_type";

export async function addTaskDetail(request: AddTask) {
    try {
        const resData = await Task.create({
            user_key:request.user_key,
            description: request.description,
            status: request.status
        })
        return resData;
    } catch (err) {
        console.log("---------Error in Function addTaskDetail --------------",err)
        throw err;
    }
};

export async function updateTaskInDatabase(req:any) {
    try {
        const resData = await Task.update({ description: req.body.description,status: req.body.status ,updated_at: new Date()}, { where: { user_key: req.body.user_key ,task_id: req.body.task_id} })
        return resData;
    } catch (err) {
        console.log("---------Error in Function UpdateApi --------------",err)
        throw err;
    }
};

export async function deleteTaskFunction(task_id:number, user_key:number) {
    try {
        const result = await Task.destroy({
            where: { task_id, user_key },
        });
        return result;
    } catch (err) {
        console.error("---------Error in Function deleteTask --------------", err);
        throw err;
    }
}

export async function listAllTaskFunction(user_key: string, status: string) {
    try {
        let tasks;
        switch (status) {
            case 'todo':
            case 'In Progress':
            case 'Completed':
                tasks = await Task.findAll({ where: { user_key, status } });
                break;
            default:
                tasks = await Task.findAll({ where: { user_key } });
                break;
        }
        return tasks;
    } catch (err) {
        console.error("---------Error in Function listAllTask --------------", err);
        throw err;
    }
}