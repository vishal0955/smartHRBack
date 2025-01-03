import sequelize from '../config/database';

// Set up associations
Employee.hasOne(BankInfo, { foreignKey: 'employee_id' }); // Corrected foreign key
BankInfo.belongsTo(Employee, { foreignKey: 'employee_id' }); // Corrected foreign key

  Employee.hasMany(EducationDetails, { foreignKey: 'employee_id' });
  EducationDetails.belongsTo(Employee, { foreignKey: 'employee_id' });

  Employee.hasMany(Experience, { foreignKey: 'employee_id' }); // Corrected foreign key
  Experience.belongsTo(Employee, { foreignKey: 'employee_id' }); // Corrected foreign key

  Employee.hasMany(FamilyInfo, { foreignKey: 'employee_id' }); // Corrected foreign key
  FamilyInfo.belongsTo(Employee, { foreignKey: 'employee_id' }); // Corrected foreign key

  Employee.hasMany(Project, { foreignKey: 'employee_id' }); // Corrected foreign key
  Project.belongsTo(Employee, { foreignKey: 'employee_id' }); // Corrected foreign key

Department.hasMany(Employee, { foreignKey: 'department_id' });
Employee.belongsTo(Department, { foreignKey: 'department_id' });

Designation.hasMany(Employee, { foreignKey: 'designation_id' });
Employee.belongsTo(Designation, { foreignKey: 'designation_id' });

Employee.hasOne(BankInfo, { foreignKey: 'employee_id', onDelete: 'CASCADE' });
BankDetails.belongsTo(Employee, { foreignKey: 'employee_id' });

Employee.hasMany(EducationDetails, { foreignKey: 'employee_id', onDelete: 'CASCADE' });
EducationDetails.belongsTo(Employee, { foreignKey: 'employee_id' });

import Employee from './EmployeeModel';
import BankInfo from './BankInfoModel';

const db = {
  sequelize,
  Employee,
  BankInfo,
};

export default db;
