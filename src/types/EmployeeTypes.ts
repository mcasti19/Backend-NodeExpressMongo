import { Document, ObjectId } from "mongoose";
import { Query, Repository } from "./RepositoryTypes";
import { User } from "./UsersTypes";

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
    hireDate: Date;
}

export interface IEmployeeRepository extends Repository<Employee> {
    findOne(query: Query): Promise<Employee | null>;
    employeeCount(): Promise<number>;
};

export interface IEmployeeService {
    createEmployee(employee: Employee): Promise<Employee>;
    findEmployees(query?: Query): Promise<Employee[]>;
    findEmployeeById(id: string): Promise<Employee | null>;
    updateEmployee(id: string, employee: Partial<Employee>): Promise<Employee | null>;
    deleteEmployee(id: string): Promise<boolean>;
    employeeCount(): Promise<number>;
}