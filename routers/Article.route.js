/* eslint-disable import/named */
import { Router } from "express";
import Auth from "../middlewares/Auth.middleware";
import { checkArticleOwner, checkCommentOwner } from "../middlewares/checkOwner";
import ArticleController from "../controllers/Article.controller";
// eslint-disable-next-line import/no-duplicates
import Validate from "../middlewares/Validate.middleware";
import CommentAuthor from "../middlewares/CheckCommentAuthor";
import singleArticle from "../middlewares/getSingleArticle";

const router = Router();

router.post("/", Auth.verifyToken, Validate.validateArticle, ArticleController.createStory);

router.get("/", ArticleController.getAllArticles);

router.get("/personal", Auth.verifyToken, ArticleController.getStoryOwn);
router.get("/personal/:articleId", Auth.verifyToken, ArticleController.getYourStory);

router.get("/:id", ArticleController.getSpecificArticle);

router.patch("/:articleId", Auth.verifyToken, checkArticleOwner, Validate.validateUpdateArticle, ArticleController.editStory);

router.delete("/:articleId", Auth.verifyToken, ArticleController.deleteStory);

router.patch("/:articleId/like", Auth.verifyToken, ArticleController.likeArticle);

router.patch("/:articleId/unlike", Auth.verifyToken, ArticleController.unlikeArticle);

router.post("/:id/comments", Auth.verifyToken, Validate.validateComment, ArticleController.postComment);

router.get("/:id/comments", ArticleController.getComments);

router.patch("/:articleId/comments/:commentId", Auth.verifyToken, Validate.validateComment, CommentAuthor, ArticleController.modifyComment);

router.get("/:id/comments/:commentId", singleArticle, ArticleController.getSingleComment);

router.delete("/:id/comments/:commentId", Auth.verifyToken, checkCommentOwner, ArticleController.deleteComment);

router.get("/:id/comments/:commentId", singleArticle, ArticleController.getSingleComment);

router.get("/:id/likes", ArticleController.getLikers);

export default router;
