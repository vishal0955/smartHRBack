import { DataTypes } from 'sequelize';
import connectDB from '../config/DB.js';
const sequelize = connectDB();
import { Employee } from './EmployeeModels.js'; // Import Employee model

const Project = sequelize.define('Project', {
    name: { type: DataTypes.STRING },
    employee_id: {
      type: DataTypes.STRING(20),
      references: {
        model: Employee,
        key: 'employeeId', // Corrected key reference
      },
    },
    tasks: { type: DataTypes.INTEGER },
    completedTasks: { type: DataTypes.INTEGER },
    deadline: { type: DataTypes.DATE },
    projectLead: { type: DataTypes.STRING },
  });
  
  // Association

  export { Project };