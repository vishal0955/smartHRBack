import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = () => {
  const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
      host: process.env.DB_HOST, 
      port: process.env.DB_PORT || 5432, 
      dialect: 'postgres', 
      logging: false, 
    }
  );

  sequelize
    .authenticate()
    .then(() => {
      console.log('Connected to the PostgreSQL database successfully!');
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    });

  return sequelize;
};

export default connectDB;
