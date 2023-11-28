import { createLogger } from "winston";
import { transports, format } from "winston";
/* import "dotenv/config"; */
/* import devLogger from "../utils/dev-logger.js";
import prodLogger from "../utils/prod-logger.js"; */
import { dirname } from "path";
import { fileURLToPath } from "url";

export const __dirname = dirname(fileURLToPath(import.meta.url));
const { combine, printf, timestamp, colorize, simple, errors } = format;

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

const logger = createLogger({
  levels: customLevelsOptions.levels,
  format: combine(
    simple(),
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    errors({ stack: true }),
    printf((info) => `[${info.timestamp}] ${info.level} ${info.message}`)
  ),
  transports: [
    new transports.File({
      maxFiles: "30",
      filename: `${__dirname}/../logs/errors.log`,
      level: "error",
    }),

    new transports.Console({
      level: "debug",
      format: combine(
        format.colorize( {color: customLevelsOptions.colors})
      ),
    
    }),
  ],
});

/* if (process.env.NODE_ENV === "development") {
  logger = devLogger;
} else {
  logger = prodLogger;

} */

export const addLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.http(`${req.method} en  ${req.url}`);
  next();
};
export default logger;
