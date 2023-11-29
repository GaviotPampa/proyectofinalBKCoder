import {connect} from "mongoose";
import {config} from '../../../../config/config.js';
import logger from '../../../../middlewares/logger-mw.js';

//connection local
/* const connectionString = 'mongodb://localhost:27017/ecommerce'; */

/* export const connectionString = ""; */

try {
  await connect(/* connectionString */
    config.MONGO_ATLAS_URL
  );
  logger.info("🪁Connected to MongoDB");
} catch (error) {
  logger.error("🚫Cannot connect to database dbConnection" +  error);
}
