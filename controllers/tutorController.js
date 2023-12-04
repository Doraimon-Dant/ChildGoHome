//Schemas
import {Tutor} from '../models/tutorSchema.js'
import {Celphone} from '../models/telefonoSchema.js'
import {Domicilio} from '../models/domicilioSchema.js'
import { Rol } from '../models/rolSchema.js'
import { Salon } from '../models/salonSchema.js'
import { userErrors } from '../utils/errorHandler.js'

export const listaTutoresView = async (req,res)=>{
  
  const {status} = req.typeUser
  try {
    const tutores  = await Tutor.find({}).populate(['salonId','TelefonoId','RolId'])
    const domicilios =await Domicilio.find({})
    const Nombres = []
    tutores.forEach(tutor=>{
      const Nombre = tutor.Nombre.split(' ')
      console.log(Nombre)
      Nombres.push(Nombre)
    })
    res.status(200).render('listaTutores',{titulo: `Child go home -> Lista Tutores`, status: status,value:"tutores", errors: req.flash("Error"), tutores,domicilios})
  } catch (error) {
    console.log(error)
  }
}

export const createTutorView = async (req,res)=>{
  
  const {status} = req.typeUser 
  try {
    const salones = await Salon.find({})
    let grupos = []
    salones.forEach(salon=>{
      grupos.push(salon.grupo)
    })
    grupos.sort()
    res.status(200).render("regTutor",{titulo: `Child go home -> Registrar Tutor`, status: status,value:"tutores", errors: req.flash("Error"),method:"Create",grupos})
  } catch (error) {
    console.log(error)
    req.flash("Error",userErrors[error.message])
    res.redirect('./')
  }
}
export const createTutor= async(req,res)=>{
  const Nombre = `${req.body.Nombre} ${req.body.Apellidos}`
  const {grupo,Telefono,Calle, Colonia,Numero, Ciudad, Codpostal }=req.body
  try {
    if(!Nombre||!Telefono||!Calle||!Colonia||!Numero||!Ciudad||!Codpostal) throw new Error("Empty")
    if(Telefono.length<10) throw new Error("Short")
    let telefono = await Celphone.findOne({Telefono})
    if(telefono) throw new Error("T Exists")
    //Save new Phone
    telefono = new Celphone({Telefono})
    telefono.save()
    
    let salon = await Salon.findOne({grupo})
    let rol = await Rol.findOne({Rol:"Tutor"})
    let tutor = new Tutor({Nombre,salonId:salon.id,TelefonoId:telefono.id,RolId:rol.id})
    tutor.save()
    let domicilio = new Domicilio({calle:Calle,colonia:Colonia,numero:Numero,ciudad:Ciudad,codigoPostal:Codpostal,tutorId:tutor.id})
    domicilio.save()
    res.redirect('./tutores')
  } catch (error) {
    console.log(error)
    req.flash('Error',userErrors[error.message])
    res.redirect('/user/newTutor')
  }
}
export const updateTutorView = async(req,res)=>{
  const {status} = req.typeUser
  try {
    const {id} = req.params
    console.log("View:",id)
    const salones = await Salon.find({})
    const tutor = await Tutor.findById({_id:id}).populate(['salonId','TelefonoId','RolId'])
    const domicilio = await Domicilio.findOne({tutorId:id})
    const nombre = tutor.Nombre.split(' ')
    let grupos = []
    salones.forEach(salon=>{
      grupos.push(salon.grupo)
    })
    grupos.sort()
    res.status(200).render("regTutor",{titulo: `Child go home -> Actualizar Tutor`, status: status,value:'tutores', errors: req.flash("Error"),method:"Update",grupos, tutor, nombre, domicilio})
  } catch (error) {
    console.log(error)
  }
}

export const updateTutor=async (req,res)=>{
  const {id} = req.params
  console.log("Update Tutor: ",id)
  const Nombre =`${req.body.Nombre} ${req.body.Apellidos}`
  const {grupo,prevTelefono, Telefono, Calle, Colonia, Numero,Ciudad,CodPostal} = req.body
  try {
    console.log(grupo,prevTelefono, Telefono, Calle, Colonia, Numero,Ciudad,CodPostal)
    if(!Nombre||!grupo||!Telefono||!Calle||!Colonia||!Numero||!Ciudad||!CodPostal) throw new Error("Empty")

    const salon = await Salon.findOne({grupo})
    const TelefonoUpd = await Celphone.findOneAndUpdate({Telefono:prevTelefono},{Telefono})
    const domicilio = await Domicilio.findOneAndUpdate({tutorId:id},{calle:Calle, colonia:Colonia, numero:Numero,ciudad:Ciudad,codigoPostal:CodPostal})
    const tutor = await Tutor.findOneAndUpdate({_id:id},{Nombre})
    
    if(!salon||!TelefonoUpd||!domicilio||!tutor)throw new Error("Update Faild")

    res.redirect(`../tutores/`)

  } catch (error) {
    console.log(error)
    req.flash('Error',userErrors[error.message])
    return res.redirect(`./${id}`)
  }

}
export const deleteTutor=async (req,res)=>{
  const {id} = req.params
  try {
    const tutor = await Tutor.findById({_id:id})
    const deleteTelefono = await Celphone.findByIdAndDelete({_id:tutor.TelefonoId})
    const deleteDomicilio = await Domicilio.findOneAndDelete({tutorId:tutor.id})
    if(!deleteTelefono||!deleteDomicilio)throw new Error("Delete Faild")
  } catch (error) {
    console.log(error)
    req.flash("Error",userErrors[error.message])
    res.redirect('/user/tutores')
  }
}