import { service } from '../service/index.js';
import { utility } from '../utils/index.js';

async function generateShortenUrl(req, res) {
  try {
    const { expiry } = req.body;
    const expiry_timestamp = utility.common.calculateExpiryTimestamp(expiry);

    let shorten_url = await service.shortenUrl.generate(req.body.end_point);
    while(!(await service.shortenUrl.validate(shorten_url))) {
      shorten_url = await service.shortenUrl.generate(shorten_url);
    }
    await service.shortenUrl.save({
      shorten_url: shorten_url,
      base_url: req.body.base_url,
      end_point: req.body.end_point,
      expiry_timestamp: expiry_timestamp,
    });

    return res.success('Shorten URL generated successfully.', { shorten_url, expiry_timestamp });
  } catch (error) {
    console.error(error);
    return res.error('Internal server error.');
  }
}

export const shortenUrl = {
  generateShortenUrl,
};
