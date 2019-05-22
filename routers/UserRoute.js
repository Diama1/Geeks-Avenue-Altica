// eslint-disable-next-line import/no-unresolved
import express from "express";
import UserController from "../controllers/userControllers";
import Validate from "../middlewares/Validate.middleware";

const router = express.Router();

router.post("/signup", Validate.validateUser, UserController.createAccount);
router.post("/login", Validate.validateLogin, UserController.loginUser);

export default router;
