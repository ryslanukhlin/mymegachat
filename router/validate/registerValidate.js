const { checkSchema } = require('express-validator');

module.exports = checkSchema({
   username: {
       errorMessage: 'the name must have at least 2 characters',
       notEmpty:{
           bail: true
       },
       isLength(options) {
           options({min: 2});
       }
   },
   email: {
       errorMessage: 'enter the correct email address',
       isEmail: {
           bail: true
       }
   },
   password: {
       errorMessage: 'the password must be at least 6 characters long',
       notEmpty:{
           bail: true
       },
       isLength(options) {
           options({min: 6});
       }
   },
   repeatPassword: {
       custom: {
           options: (value, {req}) => {
               if (value !== req.body.password) {
                   throw new Error('Password confirmation does not match password');
               }
               return true;
           }
       }
   }
});