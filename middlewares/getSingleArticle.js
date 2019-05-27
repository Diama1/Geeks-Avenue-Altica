import db from '../models';
const { Article } = db;

const getArticle = async (req, res, next) => {
    const { id } = req.params;

    const article = await Article.findOne({
        where: {
            id,
        }
    });

    if(article){
        next();
    }
   else{
       res.status(404).json({
           status:404,
           error:"Article not found"
       })
   }
}

export default getArticle;