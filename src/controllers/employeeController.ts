
import { Employee, IEmployeeRepository, IEmployeeService } from "../types/EmployeeTypes";
import { EmployeeRepository } from "../repositories";
import { EmployeeService } from "@services";
import { Request, Response } from "express";

const employeeRepository: IEmployeeRepository = new EmployeeRepository();
const employeeService: IEmployeeService = new EmployeeService(employeeRepository);

export const getEmployees = async (req: Request, res: Response) => {
    try {
        // const employees = await employeeService.findAllEmployees();
         const page = parseInt(req.query.page as string) || 1; // Página por defecto
        const pageSize = parseInt(req.query.pageSize as string) || 5; // Tamaño de página por defecto

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

    } catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};

export const getEmployeeById = async (req: Request, res: Response) => {
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
        res.status(400).json({ Error: "Failed to create employee", error });
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
        res.status(500).json({ Error: "Failed to Update employee", error });
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
        res.status(500).json({ Error: "Failed to Delete employee", error });
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