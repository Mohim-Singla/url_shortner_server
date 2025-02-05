import { utility } from '../../utils/index.js';

const config = {
  [utility.constant.ENVS.LOCAL]: {
    host: process.env.MONGO_HOST_IP,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    database: process.env.MONGO_DATABASE,
    isSRV: utility.common.parseBoolean(process.env.MONGO_SRV_FLAG),
  },
  [utility.constant.ENVS.DEV]: {
    host: process.env.MONGO_HOST_IP,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    database: process.env.MONGO_DATABASE,
    isSRV: utility.common.parseBoolean(process.env.MONGO_SRV_FLAG),
  },
  [utility.constant.ENVS.PROD]: {
    host: process.env.MONGO_HOST_IP,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    database: process.env.MONGO_DATABASE,
    isSRV: utility.common.parseBoolean(process.env.MONGO_SRV_FLAG),
  },
};

export const mongoConnectionConfig = config[process.env.ENV];
