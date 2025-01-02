import  { Employee }  from '../models/EmployeeModels.js'; 
import {BankInfo} from '../models/BankInfoModel.js'
import handleResponse from '../utils/ApiResponse.js';
import asyncHandler from "express-async-handler";

const createEmployee = async(req,res) => {
const {employeeId,   first_name,last_name,username,email,password,  phone_number,hire_date, department_id, designation, company_name, about,profile_image,  status} = req.body;
 
  try{
    const newEmployee = await Employee.create(
      {employeeId,   first_name,last_name,username,email,password,  phone_number,hire_date, department_id, designation, company_name, about,profile_image,  status}
    );
      handleResponse(res,201,"New Employee Added",newEmployee);
    
  }catch(err){
    res.status(500).json({err: err.message });
  }
};

const getAllEmployee =  async (req, res) => {
    try {
        const employees = await Employee.findAll();
        handleResponse(res,200,"All employees",employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; 

const getEmployeeById = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const employee = await Employee.findByPk(employeeId);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        handleResponse(res,200,"employee Details",employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteEmployee = async (req,res) => {
  try{
    const { employeeId } = req.params;
    const employee = await Employee.destroy({ where: { employeeId: employeeId } });
    if (employee === 0) return res.status(404).json({ error: 'Employee not found' });
    handleResponse(res,204,"employee Deleted Successfully","");
  }catch (error) {
    res.status(500).json({ error: error.message });
}
};


const editEmployeeDetails = async (req, res) => {
  const { employeeId } = req.params; 
  let updates = req.body; 

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }

  if (updates.hasOwnProperty('employeeId')) {
    return res.status(400).json({ error: 'Cannot update employeeId' });
  }

  try {
    const [updatedRows] = await Employee.update(updates, {
      where: { employeeId },
    });

    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Employee not found or no changes made' });
    }

    const updatedEmployee = await Employee.findByPk(employeeId);

    res.status(200).json({
      message: 'Employee updated successfully',
      data: updatedEmployee,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addBankDetails = asyncHandler( async(req,res) => {
 console.log(req.params.employeeId);
  const {bankName,accountNumber,ifscCode,branch} = req.body;
  try {
    const employee = await Employee.findByPk(req.params.employeeId);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    const bankInfo = await BankInfo.create({  bankName,accountNumber,ifscCode,branch, employeeId: req.params.employeeId  });
    res.status(201).json(bankInfo);

    res.status(201).json({
      message: 'Bank Details Added successfully',
      data: bankInfo,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const getBankDetails = asyncHandler(async(req,res) => {
  try {
    const { id } = req.params.employeeId;
    const bankInfo = await BankInfo.findOne({ where: { employeeId: id } });
    if (!bankInfo) return res.status(404).json({ error: 'Bank information not found' });
    res.json(bankInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}) 

const editBankDetails = async(req,res) => {
  try{
    const {id} = req.params.employeeId;
  }
}
export { getAllEmployee, createEmployee,getEmployeeById,deleteEmployee,editEmployeeDetails, addBankDetails,getBankDetails};

