/**
 * Express router for authentication-related endpoints.
 * @module auth
 */

import express from 'express';
import { JoiSchemas } from '../../apiValidations/index.js';
import { validateRequest } from '../../middleware/requestValidator.js';
import { controller } from '../../controller/index.js';

const router = new express.Router();

router.post('/generate', validateRequest(JoiSchemas.shortenUrl.generateShortenUrl.body), controller.shortenUrl.generateShortenUrl);

export const shortenUrl = router;
