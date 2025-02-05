import Joi from 'joi';
import { utility } from '../utils/index.js';

/**
 * Validation schema for generating a shortened URL.
 * @type {Object}
 * @property {Object} body - The body of the request.
 * @property {string} body.url - The URL to be shortened.
 * @property {Object} body.expiry - The expiry details.
 * @property {number} body.expiry.value - The value of the expiry time.
 * @property {string} body.expiry.unit - The unit of the expiry time (second, minute, hour, day).
 */
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
