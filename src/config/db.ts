import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import { Sequelize } from "sequelize";

// console.log("DB config:", {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   pass: typeof process.env.DB_PASS,
//   name: process.env.DB_NAME,
// });

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: false,
});
