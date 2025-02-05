import { mongoRepository } from '../db/mongo/repository/index.js';
import { utility } from '../utils/index.js';

/**
 * Generates a shortened URL for the given endpoint.
 * @async
 * @function generate
 * @param {string} end_point - The endpoint to be shortened.
 * @returns {Promise<string>} The generated shortened URL.
 */
async function generate(end_point) {
  const short_url = utility.common.generateShortURL(end_point);
  return short_url;
}

/**
 * Validates if the given shortened URL is unique.
 * @async
 * @function validate
 * @param {string} shorten_url - The shortened URL to be validated.
 * @returns {Promise<boolean>} True if the shortened URL is unique, otherwise false.
 */
async function validate(shorten_url) {
  const filter = {
    shorten_url,
  };
  const short_url_data = await mongoRepository.urlMappings.fetchOne(filter);
  return !short_url_data;
}

/**
 * Saves the shortened URL and its original URL to the database.
 * @async
 * @function save
 * @param {Object} params - The parameters for saving the URL.
 * @param {string} params.shorten_url - The shortened URL.
 * @param {string} params.original_url - The original URL.
 * @param {Date} params.expiry_timestamp - The expiration timestamp for the shortened URL.
 * @returns {Promise<Object>} The result of the save operation.
 */
async function save(params) {
  const data = {
    shorten_url: params.shorten_url,
    original_url: params.original_url,
    expiry_timestamp: params.expiry_timestamp,
  };
  const result = await mongoRepository.urlMappings.create(data);
  return result;
}

/**
 * Fetches the original URL corresponding to the shortened URL.
 * @async
 * @function getOriginalUrl
 * @param {string} shorten_url - The shortened URL.
 * @returns {Promise<string|null>} The original URL if found, otherwise null.
 */
async function getOriginalUrl(shorten_url) {
  const filter = {
    shorten_url,
    expiry_timestamp: { $gt: new Date() },
    is_enabled: true,
  };
  const short_url_data = await mongoRepository.urlMappings.fetchOne(filter);

  return short_url_data?.original_url;
}

/**
 * Service object for URL shortening-related operations.
 * @namespace shortenUrl
 */
export const shortenUrl = {
  generate,
  getOriginalUrl,
  save,
  validate,
};
