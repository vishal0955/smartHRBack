import  { Employee }  from '../models/EmployeeModels.js'; 
import {BankInfo} from '../models/BankInfoModel.js'
import handleResponse from '../utils/ApiResponse.js';
import asyncHandler from "express-async-handler";
import cloudinary from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createEmployee = async(req,res) => {
  const {employeeId, first_name, last_name, username, email, password, phone_number, hire_date, department_id, designation, company_name, about, status} = req.body;
 
  try {
    let profile_image_url = null;
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      fs.unlinkSync(req.file.path); // Remove file from server after upload
      profile_image_url = result.secure_url;
    }

    const newEmployee = await Employee.create({
      employeeId, first_name, last_name, username, email, password, phone_number, hire_date, department_id, designation, company_name, about, profile_image: profile_image_url, status
    });

    handleResponse(res, 201, "New Employee Added", newEmployee);
  } catch (err) {
    res.status(500).json({ err: err.message });
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

  if (Object.keys(updates).length === 0 && !req.file) {
    return res.status(400).json({ error: 'No fields to update' });
  }

  if (updates.hasOwnProperty('employeeId')) {
    return res.status(400).json({ error: 'Cannot update employeeId' });
  }

  try {
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      fs.unlinkSync(req.file.path); // Remove file from server after upload
      updates.profile_image = result.secure_url;
    }

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

// const editBankDetails = async(req,res) => {
//   try{
//     const {id} = req.params.employeeId;
//   }
// }

const addEducationDetails = asyncHandler(async(req,res) => {

  try {
    const {degree,institution,yearOfCompletion} = req.body;
    const employee = await Employee.findByPk(req.params.employeeId);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    const EducationDetails = await BankInfo.create({  degree,institution,yearOfCompletion, employeeId: req.params.employeeId });
    res.status(201).json(EducationDetails);

    res.status(201).json({
      message: 'Education Details Added successfully',
      data: EducationDetails,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const uploadProfileImage = asyncHandler(async (req, res) => {
  try {
    const { employeeId } = req.params;
    const employee = await Employee.findByPk(employeeId);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });

    const result = await cloudinary.v2.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path); // Remove file from server after upload

    employee.profile_image = result.secure_url;
    await employee.save();

    res.status(200).json({
      message: 'Profile image uploaded successfully',
      data: employee,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export { getAllEmployee, createEmployee,getEmployeeById,deleteEmployee,editEmployeeDetails, addBankDetails,getBankDetails, addEducationDetails, uploadProfileImage };

