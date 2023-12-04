export const tokenErrors = {
  ["No Token"]: "No hay token asignado",
  ["invalid signarure"]: "La firma del JWT no es valida",
  ["jwt expired"]: "El JWT ha expirado",
  ["invalid token"]: "Token no valido",
  ["jwt malformed"]: "JWT formato no valido",
  ['No Bearer']: 'Utiliza formato Bearer',
}

export const userErrors = {
  ["Empty"]: "Campos vacios, verifica que todos los campos esten llenados",
  ["Not Found"]: "Usuario no encotrado",
  ["Not Match"]: "Los datos ingresados no coinciden", 
  ["Exists"]: "Usuario ya registrado",
  ['Same PSW']: "La contraseña ingresada no puede ser similar a la anterior",
  ["No session"]: "Ruta denegada, POR FAVOR INICIA SESION",
  ["Upload Failed"]:"Error al subir archivo",
  ["Salon Exists"]: "Salon ya registrado",
  ["Salon Not Found"]: "Titulo de salon no encontrado",
  ["Not Acepted"]:"Favor de subir una imagen",
  ["Failed Delete"]:"Error al eliminar",
  ["T Exists"]:"El teléfono registrado ya ha sido registrado",
  ["Short"]:"El telefono debe contener más de 10 digitos",
  ['Update Faild']:"Actualización fallida",
  ['Delete Faild']:"Eliminacion no completada",
  ['No Phones']:"No hay telefonos"
}


export const serverErrors = {
  ["Empty"]: "Error en parametro",
}
export const sessionErrors = {
  ["No User"]:"No existe el Usuario",
  ['Denied']:"Este usuario no cuenta con los privilegios para acceder a estas funciones."
}