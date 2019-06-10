// eslint-disable-next-line import/no-unresolved
import express from "express";
import UserController from "../controllers/userControllers";
import Validate from "../middlewares/Validate.middleware";
import Auth from  "../middlewares/Auth.middleware";

const router = express.Router();

router.post("/signup", Validate.validateUser, UserController.createAccount);
router.post("/login", Validate.validateLogin, UserController.loginUser);
router.get("/signout", Auth.verifyToken, UserController.signOut);



export default router;
