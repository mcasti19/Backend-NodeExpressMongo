"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeCount = exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployeeById = exports.getEmployees = void 0;
const repositories_1 = require("../repositories");
const _services_1 = require("@services");
const employeeRepository = new repositories_1.EmployeeRepository();
const employeeService = new _services_1.EmployeeService(employeeRepository);
const getEmployees = async (req, res) => {
    try {
        // const employees = await employeeService.findAllEmployees();
        const page = parseInt(req.query.page) || 1; // Página por defecto
        const pageSize = parseInt(req.query.pageSize) || 5; // Tamaño de página por defecto
        // Validar que los parámetros sean positivos
        if (page < 1 || pageSize < 1) {
            res.status(400).json({ error: 'Invalid pagination parameters' });
            return;
        }
        const result = await employeeService.findEmployeesPaginated(page, pageSize);
        if (result.employees.length === 0) {
            res.status(404).json({ message: 'No Employees Found' });
            return;
        }
        res.status(200).json(result); // Enviar la respuesta paginada
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.getEmployees = getEmployees;
const getEmployeeById = async (req, res) => {
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
exports.getEmployeeById = getEmployeeById;
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
