/**
 * Express router for API version 1.
 * @module v1
 */

import express from 'express';
import { shortenUrl } from './shortenUrl.js';

const router = new express.Router();

router.use('', shortenUrl);

export const v1 = router;
