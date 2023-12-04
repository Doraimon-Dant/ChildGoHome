import { validationResult,body,param } from "express-validator";

export const validationResultExpress = (req,res,next)=>{
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }
  next()
}

export const paramValidator=(key)=>{
  [validatorFunctions[key],validationResult]
}

export const bodyLoginValidator=(keys)=>{
  [keys.array.forEach(key => {
    validatorFunctions[key]
  }),validationResultExpress]
}

export const bodyFormValidator=(keys)=>{
  [keys.array.forEach(key => {
    validatorFunctions[key]
  }),validationResultExpress]
}
export const bodyTutorValidator = (keys)=>{
  [keys.array.forEach(key => {
    validatorFunctions[key]
  }),validationResultExpress]
}



const validatorFunctions={
  'lUserName':body('userName','Usuario no valido').trim().notEmpty().escape(),
  'lPsw':body('psw',"contraseña no valida").trim().notEmpty().escape().isLength({min:8}),
  'userName':body("userName","usuario no valido").trim().notEmpty().escape(),
  'psw':body('psw','contraseña no valida').trim().isLength({min:8}).custom((value,{req})=>{
    if (value !== req.body.repsw){
      throw new Error('No coinciden las contraseñas')
    }
    return value
  }),
  'salon':param('salonId',"Salon no existe").trim().notEmpty().escape()
}
