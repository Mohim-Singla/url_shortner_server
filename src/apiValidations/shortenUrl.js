import Joi from 'joi';
import { utility } from '../utils/index.js';

const generateShortenUrl = {
  body: Joi.object({
    url: Joi.string().required(),
    expiry: Joi.object({
      value: Joi.number().required(),
      unit: Joi.string().valid(...utility.constant.EXPIRY_UNITS).required(),
    }).required(),
  }),
};

export const shortenUrl = {
  generateShortenUrl,
};
