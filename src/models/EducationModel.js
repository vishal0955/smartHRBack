import { DataTypes } from 'sequelize';

export const EducationDetails = sequelize.define('EducationDetails', {
    degree: { type: DataTypes.STRING },
    institution: { type: DataTypes.STRING },
    yearOfCompletion: { type: DataTypes.INTEGER },
  });
  
  // Association
  Employee.hasMany(EducationDetails, { foreignKey: 'employeeId' });
  EducationDetails.belongsTo(Employee);
  