const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLoginInput(data){
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    
     
    if(!validator.isEmail(data.email)){
        errors.email = 'Email is invalid';
    }
    if(validator.isEmpty(data.email)){
        errors.email = 'Email Field is required';
    }

    if(validator.isEmpty(data.password)){
        errors.password = 'Password Field is required';
    }

   

    return{
        errors,
        isValid : isEmpty(errors)
    }
}