import { Router } from "express";
import Auth from "../middlewares/Auth.middleware";
import checkOwner from '../middlewares/checkOwner';
import validate from '../middlewares/Validate.middleware';
import ArticleController from "../controllers/Article.controller";

const router = Router();

router.post("/", Auth.verifyToken, ArticleController.createStory);

router.patch("/:articleId",Auth.verifyToken,checkOwner,validate.validateUpdateArticle,ArticleController.editStory);

router.delete("/:articleId", Auth.verifyToken, ArticleController.deleteStory);

export default router;
