import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

//Load the SECRET KEY environment variable
dotenv.config();

const getToken=(payload)=>{
  //the token will be valid for 1 day
  const token=jwt.sign(payload,process.env.SECRET_KEY,{ expiresIn: 86400 });
  return token;
}

export default getToken;