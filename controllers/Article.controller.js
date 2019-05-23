import db from "../models";

const { Article, User } = db;

/**
 *
 * @class ArticleController - This controller class holds all controllers about articles
 *
 *  */
class ArticleController {
    /**
     *
     * @param {*} req - request
     * @param {*} res - response
     *
     * description: This helps user to create a new story
     */
    static async createStory(req, res) {
        const { id } = req.user;
        const { title, description, category } = req.body;
        const user = await User.findOne({ where: { id } });
        console.log(user.dataValues);
        if (Object.keys(user.dataValues).length) {
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
     */
    static async deleteStory(req, res) {
        const { id } = req.user;
        const { articleId } = req.params;
        const user = await User.findOne({ where: { id } });
        if (Object.keys(user.dataValues).length) {
            const article = await Article.findOne({ where: { id: articleId } });
            if (Object.keys(article.dataValues).length) {
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
                res.status(404).json({
                    status: 404,
                    error: "Article is not available to be deleted!",
                });
            }
        }
    }
}

export default ArticleController;
