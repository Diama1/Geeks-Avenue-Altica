import { Router } from "express";
import Auth from "../middlewares/Auth.middleware";
import checkOwner from '../middlewares/checkOwner';
import validate from '../middlewares/Validate.middleware';
import ArticleController from "../controllers/Article.controller";
import Validate from "../middlewares/Validate.middleware";

const router = Router();

router.post("/", Auth.verifyToken, Validate.validateArticle, ArticleController.createStory);

router.get("/", Auth.verifyToken, ArticleController.getAllArticles);

router.get("/personal", Auth.verifyToken, ArticleController.getStoryOwn);

router.get("/:id", Auth.verifyToken, ArticleController.getSpecificArticle);

router.patch("/:articleId",Auth.verifyToken,checkOwner,validate.validateUpdateArticle,ArticleController.editStory);

router.delete("/:articleId", Auth.verifyToken, ArticleController.deleteStory);
router.patch("/:articleId/like", Auth.verifyToken, ArticleController.likeArticle);
router.patch("/:articleId/unlike", Auth.verifyToken, ArticleController.unlikeArticle);

export default router;
