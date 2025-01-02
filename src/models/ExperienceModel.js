import { DataTypes } from 'sequelize';

export const Experience = sequelize.define('Experience', {
    companyName: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING },
    startDate: { type: DataTypes.DATE },
    endDate: { type: DataTypes.DATE },
  });
  
  // Association
  Employee.hasMany(Experience, { foreignKey: 'employeeId' });
  Experience.belongsTo(Employee);
  