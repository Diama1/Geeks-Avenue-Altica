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
    * @Author - Audace Uhiriwe
    * @param {title,description,category} req - Request Object
    * @param {Object} res - Response Object
    */
     static async editStory(req,res){
         const {articleId}=req.params;
         const {title,description,category}=req.body;
         
         const updateData={
             title: title || req.Existing.title,
             description:description || req.Existing.description,
             category:category || req.Existing.category
         };
         
         //@Update the Article's Data in the database
         await Article.update({
             title:updateData.title,
             description:updateData.description,
             category:updateData.category
         },{where:{id:articleId}});
         
         //@returning a response
         return res.status(200).send({
             status:res.statusCode,
             message:"Article successfully updated...",
         })
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
            if (Object.keys(article.dataValues).length) {
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
