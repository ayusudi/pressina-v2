function errorHandler(err, req, res, next){
  let status;
  let error;
  console.log(err);
  if (err.status){
    status = err.status
    if (err.error && err.error.message && err.error.message.includes("validation")){
          let temp = []
          let cekErr = err.error.errors
          for (let k in cekErr){
            temp.push(cekErr[k].message)
          }
          error = temp
    }
    else {
      error = err.message
    }
  }
  else {
    status = 500
    error = 'Error Internal Server'
  }
  res.status(status).json({
    errMsg : error
  })
}


module.exports = errorHandler