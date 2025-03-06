"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeCount = exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.findEmployeeById = exports.findEmployees = void 0;
const repositories_1 = require("../repositories");
const _services_1 = require("@services");
const employeeRepository = new repositories_1.EmployeeRepository();
const employeeService = new _services_1.EmployeeService(employeeRepository);
const findEmployees = async (req, res) => {
    try {
        const employees = await employeeService.findEmployees();
        if (employees.length === 0) {
            res.status(404).json({ message: "No Employees Found." });
            return;
        }
        res.json(employees);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.findEmployees = findEmployees;
const findEmployeeById = async (req, res) => {
    try {
        const employee = await employeeService.findEmployeeById(req.params.id);
        if (!employee) {
            res.status(404).json({ message: "No Employee Found" });
            return;
        }
        res.json(employee);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.findEmployeeById = findEmployeeById;
const createEmployee = async (req, res) => {
    try {
        const newEmployee = req.body;
        const result = await employeeService.createEmployee(newEmployee);
        console.log('newEmployee :>>', newEmployee);
        res.status(201).json(result);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(400).json({ Error: "Failed to create employee", error });
    }
};
exports.createEmployee = createEmployee;
const updateEmployee = async (req, res) => {
    try {
        const employee = await employeeService.updateEmployee(req.params.id, req.body);
        if (!employee) {
            res.status(404).json({ message: "Not Employee Found" });
            return;
        }
        res.json(employee);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json({ Error: "Failed to Update employee", error });
    }
};
exports.updateEmployee = updateEmployee;
const deleteEmployee = async (req, res) => {
    try {
        const employee = await employeeService.deleteEmployee(req.params.id);
        if (!employee) {
            res.status(404).json({ message: "Not Employee Found" });
            return;
        }
        res.json(employee);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json({ Error: "Failed to Delete employee", error });
    }
};
exports.deleteEmployee = deleteEmployee;
const employeeCount = async (_, res) => {
    try {
        const employeeCount = await employeeService.employeeCount();
        if (!employeeCount) {
            res.status(404).json({ message: "No Employees Found" });
            return;
        }
        res.json(employeeCount);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.employeeCount = employeeCount;
