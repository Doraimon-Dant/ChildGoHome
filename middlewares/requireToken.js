import jwt from 'jsonwebtoken'
import { tokenErrors } from '../utils/errorHandler.js'

export const requireToken = (req,res,next)=>{
  try {
    let token = req.session.usuario
    if(!token)throw new Error('No bearer')

    token = token.split(' ')[1]
    const {uid} = jwt.verify(token,process.env.JWT_SECRET)
    req.uid = uid
    next()
  } catch (error) {
    console.log(error)

    return res.status(401).json({error:tokenErrors[error.message]})
  }
}