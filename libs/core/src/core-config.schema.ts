import * as Joi from 'joi';

export const coreConfigSchema = {
  RABBITMQ_QUEUE_HOST: Joi.string().required(),
  RABBITMQ_QUEUE_PORT: Joi.number().required(),
  RABBITMQ_QUEUE_USERNAME: Joi.string().required(),
  RABBITMQ_QUEUE_PASSWORD: Joi.string().required(),
  TRANSACTION_QUEUE_NAME: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_SYNC: Joi.boolean().default(false),
  DB_TIMEZONE:Joi.string().default('Z'),
  DB_LOGGING: Joi.boolean().default(false),
  DB_CHARSET: Joi.string().default('utf8'),
}