import crypto from 'crypto';
import _ from 'lodash';

const base62Chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const common = {
  isNullorUndefined: (data) => {
    return _.isNull(data) || _.isUndefined(data);
  },
  isBoolean: (data) => {
    return _.isBoolean(data);
  },
  parseBoolean: (data, defaultVal = false) => {
    if (common.isNullorUndefined(data)) {
      return defaultVal;
    }

    if (common.isBoolean(data)) {
      return data;
    }

    return data.toLowerCase() === 'true';
  },
  calculateExpiryTimestamp: (params) => {
    const { value, unit } = params;
    const now = new Date();

    switch (unit) {
    case 'second':
      return new Date(now.getTime() + value * 1000);
    case 'minute':
      return new Date(now.getTime() + value * 60 * 1000);
    case 'hour':
      return new Date(now.getTime() + value * 60 * 60 * 1000);
    case 'day':
      return new Date(now.getTime() + value * 24 * 60 * 60 * 1000);
    }

    return now;
  },
  base62Encode: (num) => {
    let shortURL = '';
    while (num > 0) {
      shortURL = base62Chars[num % 62] + shortURL;
      num = Math.floor(num / 62);
    }
    return shortURL.padStart(8, base62Chars[0]).slice(0, 8);
  },
  generateShortURL: (endpoint) => {
    const hash = crypto.createHash('md5').update(endpoint).digest('hex');
    const num = parseInt(hash.substring(0, 10), 16);
    return common.base62Encode(num);
  },
};
