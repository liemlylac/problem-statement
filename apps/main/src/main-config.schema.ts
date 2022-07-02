import * as Joi from 'joi';

export const mainConfigSchema = {
  TRANSACTION_QUEUE_NAME: Joi.string().required(),
}