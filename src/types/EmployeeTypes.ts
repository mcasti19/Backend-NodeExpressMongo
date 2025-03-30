import { Document, ObjectId } from "mongoose";
import { Query, Repository } from "./RepositoryTypes";

export interface Employee extends Document {
    img_profile?: string;
    name: string;
    last_name: string;
    age: number;
    email: string;
    phone: string;
    country: string;
    city: string;
    position: string;
    department: string;
    userId?: ObjectId;
    status: string;
    hireDate: Date;
}


export interface IEmployeeRepository extends Repository<Employee> {
    findOne(query: Query): Promise<Employee | null>;
    employeeCount(): Promise<number>;
    findPaginated(page: number, pageSize: number, query?: Query): Promise<{ employees: Employee[], totalEmployees: number }>;
};

export interface PaginatedResponse<T> {
    employees: T[];
    metadata: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        pageSize: number;
    };
}


export interface IEmployeeService {
    createEmployee(employee: Employee): Promise<Employee>;
    findAllEmployees(query?: Query): Promise<Employee[]>;
    findEmployeeById(id: string): Promise<Employee | null>;
    updateEmployee(id: string, employee: Partial<Employee>): Promise<Employee | null>;
    deleteEmployee(id: string): Promise<boolean>;
    employeeCount(): Promise<number>;
    findEmployeesPaginated(page: number, pageSize: number, query?: Query): Promise<PaginatedResponse<Employee>>;
}