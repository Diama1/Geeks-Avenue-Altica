import { Router } from "express";
import Auth from "../middlewares/Auth.middleware";
import ArticleController from "../controllers/Article.controller";
import Validate from "../middlewares/Validate.middleware";

const router = Router();

router.post("/", Auth.verifyToken, Validate.validateArticle, ArticleController.createStory);
router.get("/", Auth.verifyToken, ArticleController.getAllArticles);
router.get("/personal", Auth.verifyToken, ArticleController.getStoryOwn )
router.get("/:id", Auth.verifyToken, ArticleController.getSpecificArticle);
router.delete("/:articleId", Auth.verifyToken, ArticleController.deleteStory);

export default router;
