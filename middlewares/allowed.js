import { sessionErrors } from "../utils/errorHandler.js";

export const NotAllow = (req,res,next)=>{
  const {Rol} = req.typeUser
  if(Rol ==="Director"){
    next();
  }else{
    req.flash("Error",sessionErrors["Denied"])
    res.redirect('/user/')
  }

}