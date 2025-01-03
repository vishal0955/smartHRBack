import { DataTypes } from 'sequelize';
import connectDB from '../config/DB.js';
const sequelize = connectDB();
import { Employee } from './EmployeeModels.js'; // Import Employee model

export const Experience = sequelize.define('Experience', {
    companyName: { type: DataTypes.STRING },
    employee_id: {
      type: DataTypes.STRING(20),
      references: {
        model: Employee,
        key: 'employeeId', // Corrected key reference
      },
    },
    role: { type: DataTypes.STRING },
    startDate: { type: DataTypes.DATE },
    endDate: { type: DataTypes.DATE },
  });
  
  // Association

