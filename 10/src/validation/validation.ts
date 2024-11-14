import Joi from 'joi';

const cartItemSchema = Joi.object({
  productId: Joi.string().max(40).required(),
  count: Joi.number().integer().min(0)
});

export function validateUpdateCartRequestBody(requestBody: object) {
  return cartItemSchema.validate(requestBody);
}