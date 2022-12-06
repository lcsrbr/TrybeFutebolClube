import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  dialect: 'postgres',
}

module.exports = config;
