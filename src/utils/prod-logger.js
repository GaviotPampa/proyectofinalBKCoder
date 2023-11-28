/* import winston from "winston"; */
import {config} from './config.js';
import { createLogger, format, transports } from "winston";
const { combine, printf, timestamp, colorize, simple, align, errors } = format;

const customLevelsOptions = {
  levels: {
    error: 0,
    warning: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
  },
  colors: {
    error: "bold red",
    warning: "bold orange",
    info: "blueBG",
    http: "italic yellow",
    verboose: "greenBG",
    debug: "cyabBG",
  },
};
const prodLogger = createLogger({
  levels: customLevelsOptions.levels,
  format: combine(
    colorize({ colors: customLevelsOptions.colors }),
    errors({ stack: true }),
    simple(),
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level} ${info.message}`)
  ),

  transports: [
    new transports.Console({
      level: config.LOG_LEVEL || "info",
    }),
    new transports.File({
      maxFiles: 15,
      filename: `${__dirname}/../logs/errors.log`,
      level: "error",
    }),
  ],
});

export default prodLogger;
