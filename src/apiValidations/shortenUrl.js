import Joi from 'joi';

const generateShortenUrl = {
  body: Joi.object({
    base_url: Joi.string().required(),
    end_point: Joi.string().required(),
    expiry: Joi.object({
      value: Joi.number().required(),
      unit: Joi.string().required(),
    }).required(),
  }),
};

export const shortenUrl = {
  generateShortenUrl,
};
