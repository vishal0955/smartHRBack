import express from "express";
import {  getAllEmployee, createEmployee,getEmployeeById,deleteEmployee, editEmployeeDetails,addBankDetails, getBankDetails} from "../controllers/EmployeeController.js";
import { Router } from "express";



const router = Router();

router.post("/employee/addEmployee",createEmployee);
router.get("/employee/:employeeId",getEmployeeById);
router.delete("/employee/:employeeId",deleteEmployee);
router.patch("/employee/:employeeId",editEmployeeDetails);
router.get("/employee", getAllEmployee);

//bank details API
router.post("/employee/:employeeId/addBankDetails", addBankDetails);
router.get("/employee/:employeeId/getBankDetails", getBankDetails);
router.patch("/employee/:employeeId/editBankDetails", editBankDetails);

export default router;