import { DataTypes } from 'sequelize';
import { Employee } from './EmployeeModels.js';
import connectDB from '../config/DB.js';
const sequelize = connectDB();

const BankInfo = sequelize.define('BankInfo', {
    bankName: { type: DataTypes.STRING, allowNull: false },
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
  Employee.hasOne(BankInfo, { foreignKey: 'employeeId' });
  BankInfo.belongsTo(Employee);
  
  export {BankInfo};
  
