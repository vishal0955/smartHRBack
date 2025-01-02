import { DataTypes } from 'sequelize';
import connectDB from '../config/DB.js';
const sequelize = connectDB();

const Employee = sequelize.define('Employee', {
  employeeId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(50),
    
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  hire_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  department_id: {
    type: DataTypes.ENUM('All', 'Finance', 'Developer', 'Executive','HR'),
    allowNull: false
  },
  designation: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  company_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  about: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  profile_image: {
    type: DataTypes.BLOB('long'), // Storing profile image data
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'Active', // Default status is 'Active'
  },
}, {
  tableName: 'Employee',
  timestamps: true, 
});

sequelize.sync({ alter: true })
  .then(() => console.log("Employee synchronized!"))
  .catch((err) => console.error("Error synchronizing the Employee Table database:", err));

export {sequelize, Employee };
