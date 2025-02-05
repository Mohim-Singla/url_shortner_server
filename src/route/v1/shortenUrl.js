/**
 * Express router for URL shortening-related endpoints.
 * @module shortenUrl
 */

import express from 'express';
import { JoiSchemas } from '../../apiValidations/index.js';
import { validateRequest } from '../../middleware/requestValidator.js';
import { controller } from '../../controller/index.js';

const router = new express.Router();

/**
 * Route to generate a shortened URL.
 * @name POST/generate
 * @function
 * @memberof module:shortenUrl
 * @param {function} validateRequest - Middleware to validate the request body.
 * @param {function} controller.shortenUrl.generateShortenUrl - Controller to handle the URL shortening.
 */
router.post('/generate', validateRequest(JoiSchemas.shortenUrl.generateShortenUrl.body), controller.shortenUrl.generateShortenUrl);

/**
 * Route to redirect to the original URL using the shortened URL.
 * @name GET/:tinyUrl
 * @function
 * @memberof module:shortenUrl
 * @param {function} controller.shortenUrl.redirectToOriginalUrl - Controller to handle the redirection.
 */
router.get('/:tinyUrl', controller.shortenUrl.redirectToOriginalUrl);

export const shortenUrl = router;
