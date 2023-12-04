import { Maestro } from "../models/maestroSchema.js"
import { sessionErrors } from "../utils/errorHandler.js"
export const whoIs = async(req,res,next)=>{
  const {id} = req.user
  try {
    const maestro  = await Maestro.findById({_id:id}).populate("RolId")
    if(!maestro)throw new Error("No User")

    if(maestro['RolId'].Rol ==="Director"){
       req.typeUser = {status:1,Rol:maestro['RolId'].Rol}
       next()
    }else if(maestro['RolId'].Rol ==="Prefecto"){
      req.typeUser = {status:0,Rol:maestro['RolId'].Rol}
      next()
    }

  } catch (error) {
    console.log(error)
    req.flash("Error",sessionErrors[error.message])
    res.redirect('/login')
  }
}