import express from 'express'
import { dashboard, listaMaestros, newMaestro, regMaestro, updateMaestroView,updateMaestro, } from '../controllers/userController.js';
import{newSalonForm, createSalon,listaSalones,updateSalon ,updateSalonForm, deleteSalon} from '../controllers/salonesController.js'

import { sessionActive } from '../middlewares/SessionValidator.js';
import { upload } from '../middlewares/uploadFile.js';
import { createTutor, createTutorView, deleteTutor, listaTutoresView, updateTutor, updateTutorView } from '../controllers/tutorController.js';
import { whoIs } from '../middlewares/who_is_User.js';
import { NotAllow } from '../middlewares/allowed.js';
import { notify } from '../controllers/notifyController.js';
const router = express.Router()

//MAESTRO CRUD
// SHOW FORM CREATE MAESTRO
router.get('/newUser',sessionActive,whoIs,NotAllow,regMaestro)
//CREATE MAESTRO
router.post('/newUser',sessionActive,whoIs,NotAllow,newMaestro)
// READ DOCUMENT MAESTROS
router.get('/maestros',sessionActive,whoIs,listaMaestros)
//SHOW USER INFO TO UPDATE IN FORM
router.get('/updateMaestro/:id',sessionActive,whoIs,NotAllow,updateMaestroView)
//UPDATE maestro
router.post('/updateMaestro',sessionActive,whoIs,NotAllow,updateMaestro)
// MAIN PAGE WITH USER AUTHENTICATION 
router.get('/',sessionActive,whoIs,dashboard)

//SALON CRUD
router.get('/salones/:grado',sessionActive,whoIs,listaSalones)
// CREATE SALON
router.get('/newSalon',sessionActive,whoIs,NotAllow,newSalonForm)
router.post('/newSalon',sessionActive,whoIs,NotAllow,upload.single('imagen'),createSalon)
//UPDATE SALON
router.get("/updateSalon/:id",sessionActive,whoIs,NotAllow,updateSalonForm)
router.post('/updateSalon/:id',sessionActive,whoIs,NotAllow,upload.single('imagen'),updateSalon)
//DELETE SALON
router.get('/deleteSalon/:id',sessionActive,whoIs,NotAllow,deleteSalon)
//NOTIFY
router.get('/notify/:grupo',notify)

//Tutores CRUD
router.get('/tutores',sessionActive,whoIs,NotAllow,listaTutoresView)
//CREATE TUTOR
router.get('/newTutor',sessionActive,whoIs,NotAllow,createTutorView)
router.post('/newTutor',sessionActive,whoIs,NotAllow,createTutor)
//UPDATE TUTOR
router.get('/updateTutor/:id',sessionActive,whoIs,NotAllow,updateTutorView)
router.post('/updateTutor/:id',sessionActive,whoIs,NotAllow,updateTutor)
//DELETE TUTOR
router.get('/deleteTutor/:id',sessionActive,whoIs,NotAllow,deleteTutor)
// //SESSION TEST
//   //Verificacion de session
// router.get('/protected',sesion)
//   //Creacion de session
// router.get('/create-session',crearSession)
//   // Eliminacion de session
// router.get('/session-destroy',destroySession)

// router.get('/flash',msgFlash)
// router.get('/createMsg',createMsg)

export default router;