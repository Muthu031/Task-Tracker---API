import express from "express";
import AuthController from "./auth_controller";

const router = express.Router();
const controller = new AuthController();

router.post("/register",controller.register);
router.post("/login",controller.login);




module.exports = router;