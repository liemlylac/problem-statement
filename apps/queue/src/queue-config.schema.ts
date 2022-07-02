import * as Joi from 'joi';

export const queueConfigSchema = {
  TRANSACTION_QUEUE_NAME: Joi.string().required(),
};
