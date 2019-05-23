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
     * @description - User should be able to get all the articles...
     */

    static async getAllArticles(req, res) {
        const stories = await Article.findAll();
        
        res.status(200).json({
            status:200,
            message:"All Articles",
            data: stories
        })
    }

    /**
     * @static
     *
     * @param {*} req - request
     * @param {*} res -response
     * @description - User should be able to get one specific story...
     */
    static async getSpecificArticle(req, res) {
        const specificStory = await Article.findOne({
            where:{
                id:req.params.id
            }
        });
        if (specificStory){
            res.send({
                status: 200,
                data: specificStory.dataValues
            })

        }
        else {
            res.send({
                status: 404,
                Message: "The Article not available"
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

     static async getStoryOwn(req, res){
         const { id } = req.user;
         const user = await User.findOne({where: { id }});
         if (Object.keys(user.dataValues).length) {
             const articles = await Article.findAll({ where: { authorid:id}})
             console.log(articles);
             if(articles.length){
                res.json({
                    status: 200,
                    data: articles
                })
             }
             else{
                res.json({
                    status: 200,
                    message: "You do not have any Article"
                })
             }
         }
         
         

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
        const user = await User.findOne({ where: { id } });
        if (Object.keys(user.dataValues).length) {
            const article = await Article.findOne({ where: { id: articleId } });
            console.log(article);
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
}

export default ArticleController;
