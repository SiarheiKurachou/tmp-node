import winston from "winston";

const productionMode = (process.env.NODE_ENV ?? '').trim() === 'production';
const logsLevel = productionMode ? 'info' : 'debug';

export const logger = winston.createLogger({
  level: logsLevel,
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
});