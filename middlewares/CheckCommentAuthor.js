/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
import db from "../models";

const { Article, Comment } = db;
const CommentAuthor = async (req, res, next) => {
    const { id } = req.user;
    const { articleId, commentId } = req.params;
    if (isNaN(articleId) || isNaN(commentId)) {
        return res.status(400).json({
            status: 400,
            error: "Invalid Article ID or Comment ID",
        });
    }
    const article = await Article.findOne({ where: { id: articleId } });
    if (article) {
        const comment = await Comment.findOne({ where: { id: commentId } });
        if (comment) {
            const { authorid } = comment.dataValues;
            if (parseInt(authorid, 10) === parseInt(id, 10)) {
                next();
            } else {
                res.status(403).json({
                    status: 403,
                    error: "You are not allowed to modify this comment!",
                });
            }
        } else {
            res.status(404).json({
                status: 404,
                error: "That comment is not available",
            });
        }
    } else {
        res.status(404).json({
            status: 404,
            error: "The article is not available!",
        });
    }
};

export default CommentAuthor;
