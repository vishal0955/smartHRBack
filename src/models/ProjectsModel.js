import { DataTypes } from 'sequelize';

const Project = sequelize.define('Project', {
    name: { type: DataTypes.STRING },
    tasks: { type: DataTypes.INTEGER },
    completedTasks: { type: DataTypes.INTEGER },
    deadline: { type: DataTypes.DATE },
    projectLead: { type: DataTypes.STRING },
  });
  
  // Association
  Employee.hasMany(Project, { foreignKey: 'employeeId' });
  Project.belongsTo(Employee);
  
  export {Project};