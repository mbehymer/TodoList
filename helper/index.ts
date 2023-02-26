const Joi = require('joi');

function validateContact(user)
{
    const JoiSchema = Joi.object({
                  
       
        user: Joi.string()
               .email()
               .min(5)
               .max(50)
               .optional(), 
                  
        monday: Joi.array().items(Joi.string()
        .min(5)
        .max(30)
        .required()),
                  
        tuesday: Joi.array().items(Joi.string()
        .min(5)
        .max(30)
        .required()),
                  
        wednesday: Joi.array().items(Joi.string()
        .min(5)
        .max(30)
        .required()),
                  
        thursday: Joi.array().items(Joi.string()
        .min(5)
        .max(30)
        .required()),
                  
        friday: Joi.array().items(Joi.string()
        .min(5)
        .max(30)
        .required()),
                 
        saturday: Joi.array().items(Joi.string()
        .min(5)
        .max(30)
        .required()),
                 
        sunday: Joi.array().items(Joi.string()
        .min(5)
        .max(30)
        .required()),
                
    }).options({ abortEarly: false });
  
    return JoiSchema.validate(user)
}

function validateDelete(user)
{
    const JoiSchema = Joi.object({
                  
       
        user: Joi.string()
               .email()
               .min(5)
               .max(50)
               .optional(), 
                
    }).options({ abortEarly: false });
  
    return JoiSchema.validate(user)
}

module.exports = {validateContact, validateDelete}

