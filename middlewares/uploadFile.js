import multer from 'multer'
import { filesList } from '../utils/acepetedFiles.js'
import { userErrors } from '../utils/errorHandler.js'

const storage = multer.diskStorage({
  destination:"public/data/uploads",
  filename:function(req,file,cb) {
    cb(null,file.originalname)

  }
})
export const upload = multer({storage})