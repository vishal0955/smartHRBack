import { DataTypes } from 'sequelize';
import Department from './DepartmentModel.js';
import Designation from './DesignationModel.js';
import {BankInfo} from './BankInfoModel.js';
import {EducationDetails} from './EducationModel.js';
import connectDB from '../config/DB.js';
const sequelize = connectDB();

const Employee = sequelize.define('Employee', {
  employeeId: {
    type: DataTypes.STRING(20),
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
    type: DataTypes.INTEGER,
    references: {
      model: 'Department',
      key: 'department_id',
    },
    onDelete: 'SET NULL',
  },
  designation_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Designation',
      key: 'designation_id',
    },
    onDelete: 'SET NULL',
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
    type: DataTypes.STRING, // Storing Cloudinary URL
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
