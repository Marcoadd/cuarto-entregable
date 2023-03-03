/*{
  error: flase,
  status: 201,
  message: 'User created Succesful',
  data{
    id: 5,
    firstName: 'Marco'
  }
}
*/

//? Para respuestas exitosasconst success = ({status, data, message, res}) => {res.status(status).json({error: false,status: status,message: message,data: data})}//? Para respuestas de erroresconst error = ({status, data, message, res, fields}) => {res.status(status).json({error: true,status: status,message: message,fields: fields})}

//? para respuestas exitosas

const success = ({status, message, data, res}) => {
  res.status(200).json({
    error: false,
    status: status,
    message: message,
    data: data
  })
}

//? para respuestas de errores

const  error = ({status, data, message, res, fields}) => {
  res.status(400).json({
    error: true,
    status: status,
    message: message,
    fields: fields
  })
}

module.exports = {
  success,
  error
}

//* ejemplos de usos en los servicios

/*
const getAllProducts = () => {
  findAllProducts()
    .then(data => {
       success({
        res,
        data,
        status: 200,
        message: 'User created Succesful'
       })
    }) 
    .catch(err => {
      error({
          res,
          data: err,
          status: 200,
          message: 'Se Produjo un error al mostrar todos los productos'
      })
    })
}

const getProductById = () => {
  findProductById()
    .then(data => {
          if(data) {
            success({
              res,
              data: error,
              status: 200,
              message: 'Product with id' + data.id
            })
         }else{
          error({
            res,
            status: 404,
            message: 'Producto no encontradi'
          })
         }
       })
    .catch(err => {
      error({
          res,
          data: error,
          status: 200,
          message: 'Se Produjo un error al mostrar todos los productos'
      })
    })
  }

  */