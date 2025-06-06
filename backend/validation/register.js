const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data){
    let errors = {};

    data.nom = !isEmpty(data.nom) ? data.nom : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    
    if(!validator.isLength(data.nom, {min : 2, max :30})){
        errors.nom = 'Name must be between 2 and 30 characters';
    }

    if(validator.isEmpty(data.nom)){
        errors.nom = 'Name Field is required';
    }
    if(!validator.isEmail(data.email)){
        errors.email = 'Email is invalid';
    }
    if(validator.isEmpty(data.email)){
        errors.email = 'Email Field is required';
    }

    if(validator.isEmpty(data.password)){
        errors.password = 'Password Field is required';
    }
    if(!validator.isLength(data.password, {min : 6, max :30})){
        errors.password = 'Password must be between 6 and 30 characters';
    }


    return{
        errors,
        isValid : isEmpty(errors)
    }
}