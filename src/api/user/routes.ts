import express from "express";
import UserController from "./user_controller";


const router = express.Router();
const controller = new UserController();

router.post("/add_Task",controller.addTask);
router.put("/update_Task",controller.updateTask);
router.delete("/delete_Task",controller.deleteTask);
router.get('/list_all_task',controller.listAllTask);



module.exports = router;