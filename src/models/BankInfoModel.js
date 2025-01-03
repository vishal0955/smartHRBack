import { DataTypes } from 'sequelize';
import { Employee } from './EmployeeModels.js';
import connectDB from '../config/DB.js';
 // Ensure Employee model is imported

const sequelize = connectDB();

// Ensure Employee model is initialized

const BankInfo = sequelize.define('BankInfo', {
    bankName: { type: DataTypes.STRING, allowNull: false },
    employee_id: {
      type: DataTypes.STRING(20),
      references: {
        model: 'Employee',
        key: 'bankName', // Corrected key reference
      },
    },
    accountNumber: { type: DataTypes.STRING, allowNull: false },
    ifscCode: { type: DataTypes.STRING },
    branch: { type: DataTypes.STRING },
  }, {
    tableName: 'BankInfos',
  });

sequelize.sync({ alter: true })
  .then(() => console.log("BankInfos synchronized!"))
  .catch((err) => console.error("Error synchronizing the BankInfos Table database:", err));

// Association

export { BankInfo };

