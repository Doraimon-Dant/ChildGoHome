import express from 'express'
import { index, login, loginview } from '../controllers/baseController.js';

const router = express.Router()

router.get('/', index)
router.get('/login', loginview)
router.post('/login', login)

export default router;