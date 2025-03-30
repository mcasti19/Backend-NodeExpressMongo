"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRepository = void 0;
const models_1 = require("../models");
class EmployeeRepository {
    employeeCount() {
        throw new Error("Method not implemented.");
    }
    async create(data) {
        const newEmployee = new models_1.EmployeeModel(data);
        return await newEmployee.save();
    }
    async find(query) {
        return await models_1.EmployeeModel.find(query || {})
            .populate("userId")
            .exec();
    }
    async findById(id) {
        return await models_1.EmployeeModel.findById(id)
            .populate("userId")
            .exec();
    }
    async findOne(query) {
        return await models_1.EmployeeModel.findOne(query)
            .populate("userId")
            .exec();
    }
    async update(id, data) {
        return await models_1.EmployeeModel.findByIdAndUpdate(id, data, { new: true })
            .populate("userId")
            .exec();
    }
    async delete(id) {
        const deleted = models_1.EmployeeModel.findByIdAndDelete(id).exec();
        return deleted !== null;
    }
    async findPaginated(page, pageSize, query) {
        const skip = (page - 1) * pageSize;
        const [employees, totalEmployees] = await Promise.all([
            models_1.EmployeeModel.find(query || {})
                .skip(skip)
                .limit(pageSize)
                .populate("userId")
                .exec(),
            models_1.EmployeeModel.countDocuments(query || {})
        ]);
        return { employees, totalEmployees };
    }
}
exports.EmployeeRepository = EmployeeRepository;
