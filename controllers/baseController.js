import { Maestro } from "../models/maestroSchema.js"
import { Rol } from "../models/rolSchema.js"
import { userErrors } from "../utils/errorHandler.js"
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js"

const roles = [{ Rol: "Tutor", Descripcion: "Recibe unicamente mensajes." }, { Rol: "Prefecto", Descripcion: "Acceso a panel de salones para notificar la salida de los estudiantes." }, { Rol: "Director", Descripcion: "Creacion, actualizacion y borrado de datos en el sistema." }]

export const index = async (req, res) => {
  try {
    let rol = await Rol.find({})
    if (rol.length === 0) {
      for (let idx = 0; idx < roles.length; idx++) {
        rol = new Rol(roles[idx])
        await rol.save()
      }
    }
    // console.log(req.flash("Error"))

    return res.status(200).render('about', { titulo: "Child go home -> LOGIN", status: 3,value:"about", errors: req.flash("Error") })
  } catch (error) {
    console.log(error)
    req.flash("Error", error.message)
    return res.status(400).redirect('/')
  }
}
export const loginview = async (req, res) => {
  try {
    return res.status(200).render("login", { titulo: "Child go home -> LOGIN", status: 3,value:"about", errors: req.flash("Error") })

  } catch (error) {
    console.log(error)
    req.flash("Error", error.message)
    return res.redirect('/login')

  }
}
export const login = async (req, res) => {

  try {
    const { userName, psw } = req.body
    if (!userName || !psw) throw new Error("Empty")
    let maestro = await Maestro.findOne({ userName }).populate("RolId")

    if (!maestro) throw new Error("Not Found")
    let isCorrectPassword = await maestro.comparePassword(psw)
    if (!isCorrectPassword) throw new Error("Not Match")
    // res.status(200).json({token:token})

    //Cracion de session de usuario con Passport
    req.login(maestro, function (err) {
      if (err) throw new Error("Error al crear session")
      return res.status(200).redirect('/user/')
    })
  } catch (error) {
    console.log(error)
    req.flash("Error", userErrors[error.message])
    return res.status(400).redirect('/login')
  }

}