import express from "express";
import {  getAllEmployee, createEmployee,getEmployeeById,deleteEmployee, editEmployeeDetails,addBankDetails, getBankDetails,addEducationDetails } from "../controllers/EmployeeController.js";
import { Router } from "express";
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post("/employee/addEmployee", upload.single('profile_image'), createEmployee);
router.get("/employee/:employeeId",getEmployeeById);
router.delete("/employee/:employeeId",deleteEmployee);
router.patch("/employee/:employeeId", upload.single('profile_image'), editEmployeeDetails);
router.get("/employee", getAllEmployee);

//bank details API
// router.post("/employee/:employeeId/addBankDetails", addBankDetails);
// router.get("/employee/:employeeId/getBankDetails", getBankDetails);
// // router.patch("/employee/:employeeId/editBankDetails", editBankDetails);
// router.post("/employee/:employeeId/addEducationDetails", addEducationDetails);

export default router;