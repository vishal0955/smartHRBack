import { DataTypes } from 'sequelize';
import connectDB from '../config/DB.js';
const sequelize = connectDB();

const Designation = sequelize.define('Designation', {
  designation_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Designation;