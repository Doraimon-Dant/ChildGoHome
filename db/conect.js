import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.DB_URI+process.env.DB_NAME)
  console.log('DB Conected')
} catch (error) {
  console.log(`Error de conexion a mongoDB ${error.meesage}`)
}