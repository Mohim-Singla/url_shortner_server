import Joi from 'joi';

const generateShortenUrl = {
  body: Joi.object({
    url: Joi.string().required(),
    expiry: Joi.object({
      value: Joi.number().required(),
      unit: Joi.string().required(),
    }).required(),
    prefer_existing_url: Joi.boolean().optional(),
  }),
};

export const shortenUrl = {
  generateShortenUrl,
};
