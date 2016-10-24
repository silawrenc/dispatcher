let Joi = require('joi');

let operatorSchema = Joi.object().keys({
  id: Joi.number().integer().min(1).required(),
  position: Joi.object().keys({
    lat: Joi.number().precision(6).required(),
    long: Joi.number().precision(6).required(),
  })
});

let vehicleSchema = Joi.object().keys({
  id: Joi.number().integer().min(1).required(),
  position: Joi.object().keys({
    lat: Joi.number().precision(6).required(),
    long: Joi.number().precision(6).required(),
  }),
  demand: Joi.number().precision(3).required()
});

let validator = {
  operator: function (value, message = "invalid operator data") {
    Joi.assert(value, operatorSchema, message)
  },
  vehicles: function (value, message = "invalid vehicle data") {
    Joi.assert(value, Joi.array().items(vehicleSchema), message)
  }
}

module.exports = validator;
