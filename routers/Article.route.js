import { Router } from "express";
import Auth from "../middlewares/Auth.middleware";
import ArticleController from "../controllers/Article.controller";

const router = Router();

router.post("/", Auth.verifyToken, ArticleController.createStory);
router.delete("/:articleId", Auth.verifyToken, ArticleController.deleteStory);

export default router;
