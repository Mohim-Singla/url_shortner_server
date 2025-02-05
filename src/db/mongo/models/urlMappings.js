import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  shorten_url: { type: String, required: true },
  original_url: { type: String, required: true },
  expiry_timestamp: { type: Date, required: false },
  is_enabled: { type: Boolean, default: true },
}, { timestamps: true });

const indexes = [
  { shorten_url: 1 },
  { original_url: 1 },
  { shorten_url: 1, expiry_timestamp: 1 },
  { original_url: 1, expiry_timestamp: 1 },
];

let model;

export const urlMappingsModel = {
  init: async (mongoConnection) => {
    indexes.forEach((index) => schema.index(index));
    model = mongoConnection.model('url_mappings', schema, 'url_mappings');
  },

  getModel: () => model,
};
