/* eslint-disable no-restricted-globals */
/* eslint-disable no-dupe-keys */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
import db from "../models";

const {
    Article, User, ArticleLike, Comment,Blacklist
} = db;

/**
 *
 * @class ArticleController - This controller class holds all controllers about articles
 *
 *  */
class ArticleController {
    /**
     * @Author - Elie Mugenzi
     * @param {title,description,category} req - request
     * @param {Object} res - response
     *
     * description: This helps user to create a new story
     */
    static async createStory(req, res) {
        const { id } = req.user;
        const { title, description, category } = req.body;
        const user = await User.findOne({ where: { id } });
        console.log(user.dataValues);
        if (Object.keys(user.dataValues).length) {
            const thatToken=await Blacklist.findOne({where:{token:req.token}});
            if(thatToken){
                return res.status(403).json({
                    message:"You're not allowed!"
                });
            }
            const newStory = await Article.create({
                title,
                description,
                category,
                likes: 0,
                authorid: id,
            });
            res.status(201).json({
                status: 201,
                message: "New Story created",
                data: newStory,
            });
        }
    }


    /**
     * @static
     *
     * @param {*} req - request
     * @param {*} res -response
     * @description - User should be able to get all the articles...
     */

    static async getAllArticles(req, res) {
        const { category } = req.query;
        if (category) {
            const stori = await Article.findAll({ where: { category } });
            if (stori.length) {
                res.json({
                    status: 200,
                    data: stori,
                });
            } else {
                res.status(404).json({
                    status: 404,
                    error: "Whaaat?",
                });
            }
        } else {
            const stories = await Article.findAll();

            res.status(200).json({
                status: 200,
                message: "All Articles",
                data: stories,
            });
        }
    }

    /**
     * @static
     *
     * @param {*} req - request
     * @param {*} res -response
     * @description - User should be able to get one specific story...
     */
    static async getSpecificArticle(req, res) {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({
                status: 400,
                error: "Invalid Article ID",
            });
        }
        const specificStory = await Article.findOne({
            where: {
                id: req.params.id,
            },
        });
        if (specificStory) {
            res.send({
                status: 200,
                data: specificStory.dataValues,
            });
        } else {
            res.send({
                status: 404,
                Message: "The Article not available",
            }).status(404);
        }
    }


    /**
     * @static
     *
     * @param {*} req - request
     * @param {*} res -response
     * @description - User should be able to get all articles their own...
     */

    static async getStoryOwn(req, res) {
        const { id } = req.user;
        const user = await User.findOne({ where: { id } });
        if (Object.keys(user.dataValues).length) {
            const articles = await Article.findAll({ where: { authorid: id } });
            console.log(articles);
            if (articles.length) {
                res.json({
                    status: 200,
                    data: articles,
                });
            } else {
                res.json({
                    status: 200,
                    message: "You do not have any Article",
                });
            }
        }
    }

    /**
    * @Author - Audace Uhiriwe
    * @param {title,description,category} req - Request Object
    * @param {Object} res - Response Object
    */
    static async editStory(req, res) {
        const { articleId } = req.params;
        const { title, description, category } = req.body;

        const updateData = {
            title: title || req.Existing.title,
            description: description || req.Existing.description,
            category: category || req.Existing.category,
        };

        // @Update the Article's Data in the database
        await Article.update({
            title: updateData.title,
            description: updateData.description,
            category: updateData.category,
        }, { where: { id: articleId } });

        // @returning a response
        return res.status(200).send({
            status: res.statusCode,
            message: "Article successfully updated...",
        });
    }

    /**
     * @static
     *
     * @param {*} req - request
     * @param {*} res -response
     * @description - User should be able to delete their own story...
     */
    static async deleteStory(req, res) {
        const { id } = req.user;
        const { articleId } = req.params;
        if (isNaN(articleId)) {
            return res.status(400).json({
                status: 400,
                error: "Invalid Article ID",
            });
        }
        const user = await User.findOne({ where: { id } });
        if (Object.keys(user.dataValues).length) {
            const article = await Article.findOne({ where: { id: articleId } });
            if (article) {
                if (parseInt(article.dataValues.authorid, 10) === parseInt(id, 10)) {
                    const result = await Article.destroy({ where: { id: articleId }, returning: true });
                    if (result) {
                        res.json({
                            status: 200,
                            message: "Deleted!",
                        });
                    } else {
                        res.status(500).json({
                            status: 500,
                            error: "Sorry,this article can't be deleted",
                        });
                    }
                } else {
                    res.status(400).json({
                        status: 400,
                        error: "You are not the owner of this story!",
                    });
                }
            } else {
                res.status(404).json({
                    status: 404,
                    error: "Article is not available to be deleted!",
                });
            }
        }
    }

    /**
   * @static
   * @Author - Elie Mugenzi
   * @param {*} req - request
   * @param {*} res - response
   * @description - this function enables user to like an article
   */
    static async likeArticle(req, res) {
        const { id } = req.user;
        const { articleId } = req.params;
        if (isNaN(articleId)) {
            return res.status(400).json({
                status: 400,
                error: "Invalid Article ID",
            });
        }

        const articleToLike = await Article.findOne({ where: { id: articleId } });
        if (articleToLike) {
            const liked = await ArticleLike.findOne({ where: { userid: id, articleid: articleId } });
            const { likes } = articleToLike.dataValues;
            if (!liked) {
                const newLikes = parseInt(likes, 10) + 1;

                const article = await Article.update({ likes: newLikes }, { where: { id: articleId } });
                console.log(article.dataValues);
                const articleLiked = await ArticleLike.create({
                    userid: id,
                    articleid: articleId,
                });
                if (articleLiked) {
                    res.json({
                        status: 200,
                        message: "Good!",
                    });
                }
            } else {
                res.json({
                    status: 400,
                    error: "Already liked!",
                }).status(400);
            }
        } else {
            res.status(404).json({
                status: 404,
                error: "This article is not available",
            });
        }
    }

    /**
     * @Author - Elie Mugenzi
     * @param {*} req - Request
     * @param {*} res - Response
     */

    static async unlikeArticle(req, res) {
        const { id } = req.user;
        const { articleId } = req.params;

        if (isNaN(articleId)) {
            return res.status(400).json({
                status: 400,
                error: "Invalid Article ID",
            });
        }

        const articleToUnlike = await Article.findOne({ where: { id: articleId } });
        if (articleToUnlike) {
            const { likes } = articleToUnlike.dataValues;
            const liked = await ArticleLike.findOne({ where: { userid: id, articleid: articleId } });
            if (liked) {
                const newLikes = parseInt(likes, 10) - 1;
                // eslint-disable-next-line max-len
                const article = await Article.update({ likes: newLikes }, { where: { id: articleId } });
                if (article) {
                    const articleUnliked = await ArticleLike.destroy({ where: { userid: id, articleid: articleId } });
                    if (articleUnliked) {
                        res.json({
                            status: 200,
                            message: "Unliked!",
                        });
                    }
                }
            } else {
                res.status(400).json({
                    status: 400,
                    error: "Already unliked!",
                });
            }
        } else {
            res.status(404).json({
                status: 404,
                error: "Article not available!",
            });
        }
    }


    static async postComment(req, res) {
        const { description } = req.body;

        if (isNaN(req.params.id)) {
            return res.status(400).json({
                status: 400,
                error: "Invalid Article ID",
            });
        }

        const checkArticle = await Article.findOne({
            where: {
                id: req.params.id,
            },
        });
        if (checkArticle) {
            const Commentaire = await Comment.create({
                description,
                authorid: req.user.id,
                articleid: req.params.id,
            });
            return res.status(201).json({
                status: 201,
                message: "success",
                comment: Commentaire,
            });
        }
        res.status(404).json({
            status: 404,
            message: "Article you want to comment on is not available!",
        });
    }

    /**
     * @Author - Elie Mugenzi
     * @param {object} req - Request sent to the route
     * @param {object} res - Response from server
     * @returns {object} - Object containing the response from server
     * @description - This enables users to get comments of specific article
     */
    static async getComments(req, res) {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({
                status: 400,
                error: "Invalid Article ID",
            });
        }
        const currentArticle = await Article.findOne({ where: { id } });
        if (currentArticle) {
            const comments = await Comment.findAll({ where: { articleid: id } });
            res.json({
                status: 200,
                data: comments,
            });
        } else {
            res.status(404).json({
                status: 404,
                error: "Article not available",
            });
        }
    }

    static async modifyComment(req, res) {
        const { id } = req.user;
        const { articleId } = req.params;
        const { description } = req.body;
        const comment = await Comment.update({ description }, { where: { articleid: articleId, authorid: id } }, { returning: true });
        if (comment) {
            res.json({
                status: 200,
                message: "Comment successfully updated!",
            });
        }
    }

    static async getSingleComment(req, res) {
        const { commentId, id } = req.params;
        if (isNaN(commentId) || isNaN(id)) {
            return res.status(400).json({
                status: 400,
                error: "Invalid article id or comment id!!!",
            });
        }
        const single = await Comment.findOne({
            where: {
                id: commentId,
                articleid: id,
            },
        });
        if (single) {
            res.status(200).json({
                status: 200,
                data: single.dataValues,
            });
        } else {
            res.status(404).json({
                status: 404,
                message: "no comment found",
            });
        }
    }

    static async getLikers(req, res) {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({
                status: 400,
                error: "Invalid Article ID",
            });
        }
        const article = await Article.findOne({ where: { id } });
        if (article) {
            const likes = await ArticleLike.findAll({ where: { articleid: id } });
            res.json({
                status: 200,
                data: likes,
            });
        } else {
            res.status(404).json({
                status: 404,
                error: "Article not found!",
            });
        }
    }

    /**
     * @Author Audace Uhiriwe
     * @param {articleId , commentId} req - Request Parameter
     * @param {*} res - Response Body
     */

    static async deleteComment(req, res) {
        const { commentId } = req.params;
        // @Action - Delete a comment in the database
        await Comment.destroy({ where: { id: commentId } });
        return res.status(200).send({
            status: res.statusCode,
            message: "Comment deleted successfully!",
        });
    }

    static async getYourStory(req, res) {
        const { articleId } = req.params;
        const { id } = req.user;
        if (isNaN(articleId)) {
            return res.status(400).json({
                status: 400,
                error: "Invalid Article ID",
            });
        }

        const article = await Article.findOne({ where: { id: articleId, authorid: id } });
        if (article) {
            res.json({
                status: 200,
                data: article,
            });
        } else {
            res.status(404).json({
                status: 404,
                error: "Article Not found!",
            });
        }
    }
}

export default ArticleController;
