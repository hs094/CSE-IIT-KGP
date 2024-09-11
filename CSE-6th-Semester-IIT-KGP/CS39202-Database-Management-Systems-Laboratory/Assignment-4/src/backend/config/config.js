import path from "path";
const __dirname = path.resolve();

import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "/.env") });

const envVars = process.env;
export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  db: envVars.DATABASE_STRING,
  jwtSecret: envVars.JWT_SECRET,
  supabaseBucket: envVars.SUPABASE_S3_BUCKET,
};
