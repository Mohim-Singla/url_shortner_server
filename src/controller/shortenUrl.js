import { service } from '../service/index.js';
import { utility } from '../utils/index.js';

/**
 * Generates a shortened URL and saves it to the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} The response object with the shortened URL and expiry timestamp.
 */
async function generateShortenUrl(req, res) {
  try {
    const { expiry } = req.body;
    const expiry_timestamp = utility.common.calculateExpiryTimestamp(expiry);

    let shorten_url = await service.shortenUrl.generate(req.body.url);
    while(!(await service.shortenUrl.validate(shorten_url))) {
      shorten_url = await service.shortenUrl.generate(shorten_url);
    }
    await service.shortenUrl.save({
      shorten_url: shorten_url,
      original_url: req.body.url,
      expiry_timestamp: expiry_timestamp,
    });

    return res.success('Shorten URL generated successfully.', { shorten_url: `${req.protocol}://${req.get('host')}${req.baseUrl}/${shorten_url}`, expiry_timestamp });
  } catch (error) {
    console.error(error);
    return res.error('Internal server error.');
  }
}

/**
 * Redirects to the original URL based on the shortened URL.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} The response object with the redirection or error message.
 */
async function redirectToOriginalUrl(req, res) {
  try {
    const { tinyUrl } = req.params;
    const originalUrl = await service.shortenUrl.getOriginalUrl(tinyUrl);
    if (!originalUrl) {
      return res.error('Invalid URL.', null, 404, 404);
    }
    return res.redirect(originalUrl);
  } catch (error) {
    console.error(error);
    return res.error('Internal server error.');
  }
}

export const shortenUrl = {
  generateShortenUrl,
  redirectToOriginalUrl,
};
