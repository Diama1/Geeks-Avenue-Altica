// @Bring in Our Models
import models from "../models";

// Destructuring our comment and Article Models
const { Article,Comment } = models;

/* @Check if that User who logged in,
 * Is the owner of the Article which is trying to edit
 */
module.exports = {
    checkArticleOwner: async (req, res, next) => {
        const { id } = req.user;
        const { articleId } = req.params;
    
        // @check if the Article is existing
        const result = await Article.findOne({ where: { id: articleId } });
        if (result === null) {
            return res.status(404).send({
                status: res.statusCode,
                error: "This Article is not found!",
            });
        }
    
        const response = await Article.findOne({ where: { authorid: id, id: articleId } });
    
        // @check if the current user is the owner of the story
        if (!response) {
            return res.status(400).send({
                status: res.statusCode,
                error: "Sorry! You are not the Owner of This story",
            });
        }
    
        req.Existing = response.dataValues;
        return next();
    },

    checkCommentOwner: async (req,res,next)=>{
        const { id } = req.user;
        const {commentId}=req.params;

        // @check if the Article is existing
        const result = await Article.findOne({ where: { id: parseInt(req.params.id, 10) } });
        if (result === null) {
            return res.status(404).send({
                status: res.statusCode,
                error: "This Article is not found!",
            });
        }

        // @check if the Comment is existing
        const foundComment = await Comment.findOne({ where: { id: parseInt(commentId,10) } });
        if (foundComment === null) {
            return res.status(404).send({
                status: res.statusCode,
                error: "This Comment is not found!",
            });
        }

        // @check if the current user is the owner of the comment
        const response = await Comment.findOne({ where: { authorid: id, id: parseInt(commentId,10) } });
        if (!response) {
            return res.status(400).send({
                status: res.statusCode,
                error: "Sorry! You are not the Owner of This comment",
            });
        }
    
        return next();
    }
};
