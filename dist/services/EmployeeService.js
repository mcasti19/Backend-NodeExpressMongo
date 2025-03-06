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
    async findEmployees(query) {
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
}
exports.EmployeeService = EmployeeService;
