import { Employee, IEmployeeRepository, IEmployeeService } from "../types/EmployeeTypes";
import { Query } from "../types/RepositoryTypes";


export class EmployeeService implements IEmployeeService {
    private employeeRepository: IEmployeeRepository;

    constructor(employeeRepository: IEmployeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    async createEmployee(employee: Employee): Promise<Employee> {
        return this.employeeRepository.create(employee);
    }

    async findEmployees(query?: Query): Promise<Employee[]> {
        return this.employeeRepository.find(query);
    }

    async findEmployeeById(id: string): Promise<Employee | null> {
        return this.employeeRepository.findById(id);
    }

    async updateEmployee(id: string, employee: Partial<Employee>): Promise<Employee | null> {
        return this.employeeRepository.update(id, employee);
    }

    async deleteEmployee(id: string): Promise<boolean> {
        return this.employeeRepository.delete(id);
    }

    async employeeCount(): Promise<number> {
        return this.employeeRepository.employeeCount();
    }
}