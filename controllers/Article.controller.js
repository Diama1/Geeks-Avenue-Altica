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
    static createStory(req, res) {
        const { id } = req.user;
        const { title, description, category } = req.body;
        User.findAll({ where: { id } }).then((user) => {
            if (Object.keys(user).length) {
                Article.create({
                    title,
                    description,
                    category,
                    likes: 0,
                    authorid: id,
                }).then((article) => {
                    console.log(article);
                    res.status(201).json({
                        status: 201,
                        data: article,
                    });
                });
            }
        });
    }
}

export default ArticleController;
