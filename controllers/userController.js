import { Maestro } from "../models/maestroSchema.js"
import { Rol } from "../models/rolSchema.js"
import { serverErrors, userErrors } from "../utils/errorHandler.js"
import multer from 'multer'
import mimeTypes from 'mime-types'
import { filesList } from "../utils/acepetedFiles.js"
import fs from 'fs'

//Carga de archivos multer
//Crud Maestro
export const regMaestro = async (req, res) => {
  
  const {status} = req.typeUser
  try {
    const roles = await Rol.find().where('Rol').ne("Tutor")
    return res.status(200).render('regMaestro', { titulo: "Child go home -> Registrar Maestro", status: status,value:'maestros', errors: req.flash("Errors"), method: "Create", roles })
  } catch (error) {
    console.log(error)
  }
}
export const newMaestro = async (req, res) => {
  try {
    const { Nombre, userName, psw, rol } = req.body
    let maestro = await Maestro.findOne({ userName: userName })
    const rolselected = await Rol.findOne({ Rol: rol })
    if (!Nombre || !userName || !psw) throw new Error("Empty")
    if (maestro) throw new Error("Exists")
    maestro = new Maestro({ Nombre: Nombre, userName: userName, psw: psw, RolId: rolselected.id })
    await maestro.save()
    return res.status(201).redirect('./maestros')

  } catch (error) {
    console.log(error)
    const roles = await Rol.find().where('Rol').ne("Tutor")
    return res.status(400).render('regMaestro', { titulo: "Child go home -> Registrar Maestro", status: 3 , error: userErrors[error.message], roles })
  }
}

export const listaMaestros = async (req, res) => {
  const {status} = req.typeUser
  try {
    const maestros = await Maestro.find().populate("RolId")
    return res.status(200).render('listaMaestros', { titulo: "Child go home -> Maestros", status: status,value:"maestros", errors: req.flash("Error"), maestros })
  } catch (error) {
    console.log(error)
    req.flash("Error", userErrors[error.message])
    return res.redirect('./')
  }
}

export const updateMaestroView = async (req, res) => {
  const {status} = req.typeUser
  const { id } = req.params
  try {
    const maestro = await Maestro.findById({ _id: id }).populate("RolId")
    const roles = await Rol.find().where('Rol').ne("Tutor")
    if (!maestro) throw new Error("Empty")
    res.render('regMaestro', { titulo: "Child go home -> Actualizar Maestro", status: status,value:"maestros", errors: req.flash("Error"), method: "Update", maestro, roles })
  } catch (error) {
    console.log(error)
    req.flash("Error", serverErrors[error.message])
    return res.redirect(`../maestros`)
  }
}

export const updateMaestro = async (req, res) => {
  let id = ""
  try {
    const { Nombre, userName, psw, rol } = req.body
    let maestro = await Maestro.findOne({ userName })
    const rolselected = await Rol.findOne({ Rol: rol })
    if (!maestro) throw new Error("Not Match")
    id = maestro.id

    if (!psw) {
      if (Nombre === maestro.Nombre) { maestro = await Maestro.findOneAndUpdate({ userName }, { RolId: rolselected.id }) }
      if (rol === maestro['RolId'].Rol) { maestro = await Maestro.findOneAndUpdate({ userName }, { Nombre: Nombre }) }
      if (Nombre !== maestro.Nombre && rol !== maestro['RolId'].Rol) { maestro = await Maestro.findOneAndUpdate({ userName }, { Nombre: Nombre, RolId: rolselected.id }) }
    } else {
      if (await maestro.comparePassword(psw)) throw new Error("Same PSW")
      maestro = await Maestro.findOneAndUpdate({ userName }, { psw: psw })
    }
    return res.status(201).redirect('./maestros')
  } catch (error) {
    console.log(error)
    req.flash("Error", userErrors[error.message])
    return res.redirect(`/user/updateUser/${id}`)

  }
}





// export const sesion = async (req, res) => {
//   res.json(req.session.usuario || "sin sesion de usuario")
// }
// export const crearSession = async (req, res) => {
//   req.session.usuario = "1213123-12321-12321"
//   res.redirect('./protected')
// }
// export const destroySession = async (req, res) => {
//   req.session.destroy()
//   res.redirect('./protected')
// }

// export const msgFlash = async (req, res) => {
//   res.json(req.flash('message'))
// }
// export const createMsg = async (req, res) => {
//   req.flash("message", "session")
//   res.redirect('./flash')
// }

//DASHBOARD 
export const dashboard = async (req, res) => {
  try {
    if (!req.user) throw new Error("No session")
    const { id, userName } = req.user
    const {status} = req.typeUser

    const user = await Maestro.findById({ _id: id }).populate('RolId')
    if (!user) throw new Error("Not Found")
    res.status(200).render('grados', { titulo: "Child go home -> LOGIN", status: status,value:"grados", errors: req.flash("Error")})
  } catch (error) {
    console.log(error)
    req.flash("Error", userErrors[error.message] || serverErrors[error.message])
    return res.status(404).redirect('/login')
  }

}
