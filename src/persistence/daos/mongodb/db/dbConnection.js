import mongoose from "mongoose";
import config from "../../../../config/config.js";
import logger from '../../../../middlewares/logger-mw.js';

//connection local
/* const connectionString = 'mongodb://localhost:27017/ecommerce'; */

export const connectionString = config.MONGO_ATLAS_URL;

try {
  await mongoose.connect(/* connectionString */
  (connectionString)
   /*  config.MONGO_ATLAS_URL */
  );
  logger.info("🪁Connected to MongoDB");
} catch (error) {
  logger.error("🚫Cannot connect to database dbConnection" +  error);
}
