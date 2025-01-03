import { DataTypes } from 'sequelize';
import connectDB from '../config/DB.js';
const sequelize = connectDB();
import { Employee } from './EmployeeModels.js'; // Import Employee model

export const FamilyInfo = sequelize.define('FamilyInfo', {
    name: { type: DataTypes.STRING },
    employee_id: {
      type: DataTypes.STRING(20),
      references: {
        model: Employee,
        key: 'employeeId', // Corrected key reference
      },
    },
    relation: { type: DataTypes.STRING },
    contact: { type: DataTypes.STRING },
  });
  
  // Association

