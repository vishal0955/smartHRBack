import { DataTypes } from 'sequelize';
import connectDB from '../config/DB.js';
const sequelize = connectDB();
import { Employee } from './EmployeeModels.js';

const EducationDetails = sequelize.define('EducationDetails', {
    degree: { type: DataTypes.STRING },
    employee_id: {
      type: DataTypes.STRING(20),
      references: {
        model: 'Employee',
        key: 'employeeId',
      },
    },
    institution: { type: DataTypes.STRING },
    yearOfCompletion: { type: DataTypes.INTEGER },
  }, {
    tableName: 'EducationDetails',
  }
);

  // Association

  sequelize.sync({ alter: true })
.then(() => console.log("EducationDetails synchronized!"))
.catch((err) => console.error("Error synchronizing the EducationDetails Table database:", err));
  
  export {sequelize,EducationDetails};