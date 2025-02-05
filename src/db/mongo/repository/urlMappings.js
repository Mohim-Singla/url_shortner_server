import { modelMap } from '../models/index.js';

/**
 * Fetches a single document from the URL mappings collection.
 * @param {Object} filter - The filter criteria.
 * @param {Object} [projection] - The fields to include or exclude.
 * @param {Object} [options] - Additional query options.
 * @returns {Promise<Object>} The fetched document.
 */
async function fetchOne(filter, projection, options) {
  return modelMap.urlMappingsModel.getModel().findOne(filter, projection, options);
}

/**
 * Creates a new document in the URL mappings collection.
 * @param {Object} messageData - The data to create the document with.
 * @returns {Promise<Object>} The created document.
 */
async function create(messageData) {
  return modelMap.urlMappingsModel.getModel().create(messageData);
}

export const urlMappings = {
  create,
  fetchOne,
};
