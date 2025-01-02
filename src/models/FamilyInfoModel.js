import { DataTypes } from 'sequelize';

export const FamilyInfo = sequelize.define('FamilyInfo', {
    name: { type: DataTypes.STRING },
    relation: { type: DataTypes.STRING },
    contact: { type: DataTypes.STRING },
  });
  
  // Association
  Employee.hasMany(FamilyInfo, { foreignKey: 'employeeId' });
  FamilyInfo.belongsTo(Employee);
  