import AppError from '../utils/errorutils.js';
import jwt from 'jsonwebtoken';

const isLoggedIn = async (req,res) =>
{
const {token} = req.cookies;
if(!token)
{
    return res.status(400).json({message:"User not authorized"});

}
const userDetails = jwt.verify(token, process.env.JWT_SECRET);
req.user = userDetails;
next();
}

export default isLoggedIn;