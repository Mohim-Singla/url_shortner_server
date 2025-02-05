import crypto from 'crypto';
import _ from 'lodash';
import { constant } from '../constant/index.js';

export const common = {
  /**
   * Checks if the data is null or undefined.
   * @param {*} data - The data to check.
   * @returns {boolean} True if the data is null or undefined, false otherwise.
   */
  isNullorUndefined: (data) => {
    return _.isNull(data) || _.isUndefined(data);
  },

  /**
   * Checks if the data is a boolean.
   * @param {*} data - The data to check.
   * @returns {boolean} True if the data is a boolean, false otherwise.
   */
  isBoolean: (data) => {
    return _.isBoolean(data);
  },

  /**
   * Parses the data to a boolean value.
   * @param {*} data - The data to parse.
   * @param {boolean} [defaultVal=false] - The default value if data is null or undefined.
   * @returns {boolean} The parsed boolean value.
   */
  parseBoolean: (data, defaultVal = false) => {
    if (common.isNullorUndefined(data)) {
      return defaultVal;
    }

    if (common.isBoolean(data)) {
      return data;
    }

    return data.toLowerCase() === 'true';
  },

  /**
   * Calculates the expiry timestamp based on the given parameters.
   * @param {Object} params - The parameters containing value and unit.
   * @param {number} params.value - The value of the time unit.
   * @param {string} params.unit - The unit of time (second, minute, hour, day).
   * @returns {string} The calculated expiry timestamp in ISO format.
   */
  calculateExpiryTimestamp: (params) => {
    const { value, unit } = params;
    const now = new Date();

    switch (unit) {
    case 'second':
      return new Date(now.getTime() + value * 1000).toISOString();
    case 'minute':
      return new Date(now.getTime() + value * 60 * 1000).toISOString();
    case 'hour':
      return new Date(now.getTime() + value * 60 * 60 * 1000).toISOString();
    case 'day':
      return new Date(now.getTime() + value * 24 * 60 * 60 * 1000).toISOString();
    }

    return now.toISOString();
  },

  /**
   * Encodes a number to a base62 string.
   * @param {number} num - The number to encode.
   * @returns {string} The base62 encoded string.
   */
  base62Encode: (num) => {
    let shortURL = '';
    while (num > 0) {
      shortURL = constant.base62Chars[num % 62] + shortURL;
      num = Math.floor(num / 62);
    }
    return shortURL.padStart(8, constant.base62Chars[0]).slice(0, 8);
  },

  /**
   * Generates a short URL based on the given endpoint.
   * @param {string} endpoint - The endpoint to generate the short URL for.
   * @returns {string} The generated short URL.
   */
  generateShortURL: (endpoint) => {
    const hash = crypto.createHash('md5').update(endpoint).digest('hex');
    const num = parseInt(hash.substring(0, 10), 16);
    return common.base62Encode(num);
  },
};
