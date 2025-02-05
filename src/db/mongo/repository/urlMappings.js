import { modelMap } from '../models/index.js';

async function fetchOne(filter, projection, options) {
  return modelMap.messagesModel.getModel().findOne(filter, projection, options);
}

async function create(messageData) {
  return modelMap.messagesModel.getModel().create(messageData);
}

export const urlMappings = {
  create,
  fetchOne,
};
