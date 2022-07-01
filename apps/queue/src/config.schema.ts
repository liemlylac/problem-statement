import * as Joi from 'joi';

export const configSchema = {
  NODE_ENV: Joi.string()
    .valid(...['prod', 'dev'])
    .default('prod'),
  RABBITMQ_QUEUE_HOST: Joi.string().required(),
  RABBITMQ_QUEUE_PORT: Joi.number().required(),
  RABBITMQ_QUEUE_USERNAME: Joi.string().required(),
  RABBITMQ_QUEUE_PASSWORD: Joi.string().required(),
  TRANSACTION_QUEUE_NAME: Joi.string().required(),
};
