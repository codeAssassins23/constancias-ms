import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
  SSL: boolean;
  SYNCHRONIZE: boolean;
  XRAY_DAEMON_ADDRESS: string;
  NODE_ENV: string;
  OPENSEARCH_LOG_LEVEL: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_HOST: joi.string().required(),
    DATABASE_PORT: joi.number().required(),
    DATABASE_USER: joi.string().required(),
    DATABASE_PASSWORD: joi.string().required(),
    DATABASE_NAME: joi.string().required(),
    SSL: joi.boolean().required(),
    SYNCHRONIZE: joi.boolean().required(),
    XRAY_DAEMON_ADDRESS: joi.string().required(),
    NODE_ENV: joi.string().required(),
    OPENSEARCH_LOG_LEVEL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  nodeEnv: envVars.NODE_ENV,
  database: {
    host: envVars.DATABASE_HOST,
    port: envVars.DATABASE_PORT,
    user: envVars.DATABASE_USER,
    password: envVars.DATABASE_PASSWORD,
    name: envVars.DATABASE_NAME,
    ssl: envVars.SSL,
    synchronize: envVars.SYNCHRONIZE,
  },
  xray: {
    daemonAddress: envVars.XRAY_DAEMON_ADDRESS,
  },
  opensearch: {
    logLevel: envVars.OPENSEARCH_LOG_LEVEL,
  },
};
