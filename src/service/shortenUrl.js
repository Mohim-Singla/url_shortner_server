import { mongoRepository } from '../db/mongo/repository/index.js';
import { utility } from '../utils/index.js';

async function generate(end_point) {
  const short_url = utility.common.generateShortURL(end_point);
  return short_url;
}

async function validate(shorten_url) {
  const filter = {
    shorten_url,
  };
  const short_url_data = await mongoRepository.urlMappings.fetchOne(filter);
  return !short_url_data;
}

async function save(params) {
  const data = {
    shorten_url: params.shorten_url,
    original_base_url: params.base_url,
    original_end_point: params.end_point,
    expiry_timestamp: params.expiry_timestamp,
  };
  const result = await mongoRepository.urlMappings.create(data);
  return result;
}

export const shortenUrl = {
  generate,
  save,
  validate,
};
