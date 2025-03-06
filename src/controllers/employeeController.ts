
import { Employee, IEmployeeRepository, IEmployeeService } from "../types/EmployeeTypes";
import { EmployeeRepository } from "../repositories";
import { EmployeeService } from "@services";
import { Request, Response } from "express";

const employeeRepository: IEmployeeRepository = new EmployeeRepository();
const employeeService: IEmployeeService = new EmployeeService(employeeRepository);

export const findEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await employeeService.findEmployees();
        if (employees.length === 0) {
            res.status(404).json({ message: "No Employees Found." });
            return
        }

        res.json(employees);
    } catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};

export const findEmployeeById = async (req: Request, res: Response) => {
    try {
        const employee = await employeeService.findEmployeeById(req.params.id);
        if (!employee) {
            res.status(404).json({ message: "No Employee Found" });
            return
        }

        res.json(employee);
    } catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};

export const createEmployee = async (req: Request, res: Response) => {
    try {
        const newEmployee: Employee = req.body;
        const result = await employeeService.createEmployee(newEmployee);
        console.log('newEmployee :>>', newEmployee);

        res.status(201).json(result);

    } catch (error) {
        console.log("error :>> ", error);
        res.status(400).json({Error:"Failed to create employee", error});
    }
};

export const updateEmployee = async (req: Request, res: Response) => {
    try {
        const employee = await employeeService.updateEmployee(req.params.id, req.body);
        if (!employee) {
            res.status(404).json({ message: "Not Employee Found" });
            return
        }

        res.json(employee);
    } catch (error) {
        console.log("error :>> ", error);
        res.status(500).json({Error:"Failed to Update employee", error});
    }
};

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const employee = await employeeService.deleteEmployee(req.params.id);
        if (!employee) {
            res.status(404).json({ message: "Not Employee Found" });
            return
        }

        res.json(employee);
    } catch (error) {
        console.log("error :>> ", error);
        res.status(500).json({Error:"Failed to Delete employee", error});
    }
};

export const employeeCount = async (_: Request, res: Response) => {
    try {
        const employeeCount = await employeeService.employeeCount();
        if (!employeeCount) {
            res.status(404).json({ message: "No Employees Found" });
            return
        }

        res.json(employeeCount);
    } catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};