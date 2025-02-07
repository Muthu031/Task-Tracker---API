import express from "express";
import TaskCalculator from "./task_controller";


const router = express.Router();
const controller = new TaskCalculator();


//get 
router.get('/task-count', controller.getMonthlyTaskCount)



module.exports = router;