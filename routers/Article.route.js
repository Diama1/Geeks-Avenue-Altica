import { Router } from "express";
import Auth from "../middlewares/Auth.middleware";
import ArticleController from "../controllers/Article.controller";

const router = Router();

router.post("/", Auth.verifyToken, ArticleController.createStory);

export default router;
