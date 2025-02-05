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
    original_url: params.original_url,
    expiry_timestamp: params.expiry_timestamp,
  };
  const result = await mongoRepository.urlMappings.create(data);
  return result;
}

async function getOriginalUrl(shorten_url) {
  const filter = {
    shorten_url,
    expiry_timestamp: { $gt: new Date() },
    is_enabled: true,
  };
  const short_url_data = await mongoRepository.urlMappings.fetchOne(filter);

  return short_url_data?.original_url;
}

export const shortenUrl = {
  generate,
  getOriginalUrl,
  save,
  validate,
};
