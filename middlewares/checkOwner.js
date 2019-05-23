//@Bring in Our Models
import models from '../models';

//Destructuring our User and Article Models
const {Article,User}=models;

/* @Check if that User who logged in,
 * Is the owner of the Article which is trying to edit
 */
const checkOwner=async(req,res,next)=>{
const {id}=req.user;
const {articleId}=req.params;

//@check if the Article is existing
const result=await Article.findOne({where:{id:articleId}})
if(result===null)return res.status(404).send({
status:res.statusCode,
error:"This Article is not found!"
})

const response=await Article.findOne({where:{authorid:id,id:articleId}});

//@check if the current user is the owner of the story
if (!response) return res.status(404).send({
  status:res.statusCode,
  error:"Sorry! You are not the Owner of This story"
})

req.Existing=response.dataValues;
return next();

}

module.exports=checkOwner;