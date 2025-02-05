async function generateShortenUrl(req, res) {
  try {
    return res.success('Shorten URL is working fine.', { timestamp: Date.now() });
  } catch (error) {
    console.error(error);
    return res.error('Internal server error.');
  }
}

export const shortenUrl = {
  generateShortenUrl,
};
