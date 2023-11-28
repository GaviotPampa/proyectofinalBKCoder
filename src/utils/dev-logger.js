/* import winston from "winston";
 */ import { dirname } from "path";
 import { fileURLToPath } from "url";
 export const __dirname = dirname(fileURLToPath(import.meta.url));
 import { createLogger, format, transports } from "winston";
 const { combine, printf, timestamp, /* colorize, */ simple, align } = format;
 
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
 const devLogger = createLogger({
   levels: customLevelsOptions.levels,
   format: combine(
    /*  colorize({ colors: customLevelsOptions.colors }), */
     simple(),
     timestamp({
       format: "YYYY-MM-DD HH:mm:ss",
     }),
     align(),
     printf((info) => `[${info.timestamp}] ${info.level} ${info.message}`)
   ),
 
   transports: [
     new transports.Console({
       level: "debug",}
     ),
 
   ],
 });
 
 export default devLogger;
 