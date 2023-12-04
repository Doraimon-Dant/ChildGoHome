
import { Salon } from "../models/salonSchema.js"
import { userErrors } from "../utils/errorHandler.js"
import { filesList } from "../utils/acepetedFiles.js"

// CRUD SALONES
export const listaSalones = async (req,res)=>{
  const{grado}=req.params
  const {status} = req.typeUser
  try {
    const salones = await Salon.find({}).where("grado").equals(grado)
    res.render("listaSalon",{titulo: `Child go home -> Salones de ${grado}°`, status: status,value:"salones", errors: req.flash("Error"), salones,grado:grado})
  } catch (error) {
    console.log(error)
    req.flash("Error",userErrors[error.message])
    res.redirect('/user')
    
  }
}

export const newSalonForm = async (req,res)=>{
  const {status} = req.typeUser
  try {
    res.render("regSalon",{ titulo: "Child go home -> Registrar Salon", status: status,value:"grados", errors: req.flash("Error"), method: "Create"})
  } catch (error) {
    console.log(error)
  }
}

export const createSalon = async (req,res)=>{
  try {
    const ruta = "data/uploads"
    const{Titulo,Descripcion,grado,grupo}=req.body
    const imagen = req.file
    if(!imagen ||!Titulo||!Descripcion||!grado||!grupo)throw new Error("Empty")
    if(!filesList[imagen.mimetype]){
      fs.unlink(`./public/data/uploads/${imagen.originalname}`,(err)=>{
        if(err){console.log(err)}
        console.log("deleted")
      })
      throw new Error("Not Acepted")
    }
    
    let salon = await Salon.find({Titulo}).and({grupo:grupo.toUpperCase()})
    console.log(salon)
    if(salon.length>0)throw new Error("Salon Exists")
    salon = new Salon({Titulo,Descripcion,grado,imagen:`/${ruta}/${imagen.filename}`,grupo:grupo.toUpperCase()})
    await salon.save()
    
    res.redirect(`./salones/${salon.grado}`)
  } catch (error) {
    
    console.log(error)
    req.flash("Error",userErrors[error.message])
    return res.redirect("./newSalon")
  }
}
export const updateSalonForm=async (req,res)=>{
  const {id} =req.params
  
  const {status} = req.typeUser
  try {
    const salon = await Salon.findById({_id:id})
    res.render('regSalon', { titulo: "Child go home -> Actualizar Salon", status: status,value:"grados", errors: req.flash("Error"), method: "Update", salon})  
  } catch (error) {
    console.log(error)
  }
   
}
export const updateSalon = async(req,res)=>{
  const {id} = req.params
  try {
    const ruta = "data/uploads"
    const{Titulo,Descripcion,grado,grupo}=req.body
    const imagen = req.file
    // console.log(Titulo, Descripcion, grado, imagen, grupo)
    if(!Titulo||!Descripcion||!grado||!imagen||!grupo) throw new Error("Empty")   

    if(!filesList[imagen.mimetype]){
      fs.unlink(`./public/data/uploads/${imagen.originalname}`,(err)=>{
        if(err){console.log(err)}
        console.log("deleted")
      })
      throw new Error("Not Acepted")
    }
    const rutaimg = `/data/uploads/${imagen.filename}`
    const salon = await Salon.findByIdAndUpdate({_id:id},{Titulo,Descripcion,grado,imagen:rutaimg,grupo})

    if(!salon)throw new Error("Salon Not Found")
    // for(const idx = 0 ; idx<salon.length;idx++){
    //   if(salon[idx]===Titulo){
    //     console.log(salon[idx])
    //   }
    // }
    res.redirect(`../salones/${grado}`)


  } catch (error) {
    console.log(error)
    req.flash("Error",userErrors[error.message])
    return res.redirect(`./${id}`)
  }

}

export const deleteSalon = async (req,res)=>{
  const {id} = req.params
  let grado = ''
  try {
    
    const salon = await Salon.findById({_id:id})
    grado = salon.grado
    
    const deleted = await Salon.findOneAndDelete({_id:id})
    if(!deleted) throw new Error("Failed Delete")
    // const deleted = await Salon.findByIdAndRemove({_id:id})
    // if(!deleted)throw new Error("Failed Delete")
    res.redirect(`/user/salones/${grado}`)
  } catch (error) {
    console.log(error)
    req.flash("Error",userErrors[error.message])
    res.redirect(`/user/salones/${grado}`)
  }
}

