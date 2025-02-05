import { utility } from '../utils/index.js';

const map={};

async function generate(end_point) {
  const short_url = utility.common.generateShortURL(end_point);
  return short_url;
}

async function validate(short_url) {
  return !map[short_url];
}

async function save(params) {
  map[params.shorten_url] = true;
}

export const shortenUrl = {
  generate,
  save,
  validate,
};
