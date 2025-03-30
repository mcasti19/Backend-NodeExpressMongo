"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
class EmployeeService {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    async createEmployee(employee) {
        return this.employeeRepository.create(employee);
    }
    async findAllEmployees(query) {
        return this.employeeRepository.find(query);
    }
    async findEmployeeById(id) {
        return this.employeeRepository.findById(id);
    }
    async updateEmployee(id, employee) {
        return this.employeeRepository.update(id, employee);
    }
    async deleteEmployee(id) {
        return this.employeeRepository.delete(id);
    }
    async employeeCount() {
        return this.employeeRepository.employeeCount();
    }
    async findEmployeesPaginated(page, pageSize, query) {
        const { employees, totalEmployees } = await this.employeeRepository.findPaginated(page, pageSize, query);
        const totalPages = Math.ceil(totalEmployees / pageSize);
        return {
            employees,
            metadata: {
                currentPage: page,
                totalPages,
                totalItems: totalEmployees,
                pageSize
            }
        };
    }
}
exports.EmployeeService = EmployeeService;
