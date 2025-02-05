import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  shorten_url: { type: String, required: true },
  original_base_url: { type: String, required: true },
  original_end_point: { type: String, required: true },
  expiry_timestamp: { type: Date, required: false },
}, { timestamps: true });

let model;

export const urlMappingsModel = {
  init: async (mongoConnection) => {
    model = mongoConnection.model('url_mappings', schema, 'url_mappings');
  },

  getModel: () => model,
};
