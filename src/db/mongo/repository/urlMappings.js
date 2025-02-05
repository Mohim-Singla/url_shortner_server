import { modelMap } from '../models/index.js';

async function fetchOne(filter, projection, options) {
  return modelMap.urlMappingsModel.getModel().findOne(filter, projection, options);
}

async function create(messageData) {
  return modelMap.urlMappingsModel.getModel().create(messageData);
}

export const urlMappings = {
  create,
  fetchOne,
};
