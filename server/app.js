// Archivos de acceso automatico
import 'dotenv/config' //datos de servidor privados
import '../db/conect.js'// conexion de base de datos

// librerias y paquetes
import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import flash from 'connect-flash'
import passport from 'passport'

//gestionador de archivos de servidor
// import fileUpload from 'express-fileupload'
// import multer from 'multer'
// import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'
import path from 'path'

//enrutamiento del servidor
import userRoutes from '../routers/userRoues.js'
import baseRoutes from '../routers/baseRoues.js'

//constantes de direccionamiento 
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//Constantes de Multer
// const storage= multer.diskStorage({
//     destination:path.join(__dirname,'../public/data/uploads'),
//     filename:function(req,file, cb) {
//       cb("",file.originalname)
//     }

// })
//constantes de servidor
const app = express()
const port = process.env.PORT || 5500



//plantillas
app.set('view engine', 'ejs')

//rutas de view y configuracion de plantillas
app.set('views', path.join(__dirname, '../view'))

//Middleware para la subida de archivos
// app.use(multer({
//   storage:storage,
// }).single('imagen'))
// app.use(fileUpload())
// GESTION DE SESSIONES
app.use(session({
  secret: process.env.SECRET_SESS,
  resave: false,
  saveUninitialized: false,
  name: process.env.NAME_SESS,
}))
//SESSIONES VOLATILES QUE SOLO VIVEN UNA VEZ
app.use(flash())


//PASSPORT
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((maestro, done) => done(null, { id: maestro.id, userName: maestro.userName }))//req.user
passport.deserializeUser((maestro, done) => {
  return done(null, maestro)
})

//Lector de cookies
// app.use(cookieParser())
//middlewares y herramientas del servidor
app.use(bodyParser.json()) //lectura de datos en formato json
app.use(bodyParser.urlencoded({ extended: true }))//lectura de datos por medio de body activado
//archivos estaticos del servidor 
app.use(express.static(path.join(__dirname, '../public')))

//sesiones
// app.use(session({
//   secret:process.env.SECRET_SESS,
//   resave:false,
//   saveUninitialized:false,
//   name:process.env.NAME_SESS,
//   cookie:{maxAge:6000,secure:true}
// }))
//rutas del servidor

app.use('/', baseRoutes)//rutas de acceso publico
app.use('/user', userRoutes) //rutas de usuario

//desvio de rutas desconocidas
app.use((req, res, next) => {
  res.status(404).render('404', { titulo: "Error 404", message: "The page you are trying to get doesn't exist" })
})

//inicializacion de servidor

app.listen(port, () => {
  console.log(`Example app listening at ${process.env.APP_DEPLOY}${port}`)
})

