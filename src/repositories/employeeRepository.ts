import { Employee, IEmployeeRepository } from "../types/EmployeeTypes";
import { EmployeeModel } from "../models";
import { Query } from "../types/RepositoryTypes";


export class EmployeeRepository implements IEmployeeRepository {
  employeeCount(): Promise<number> {
    throw new Error("Method not implemented.");
  }

  async create(data: Employee): Promise<Employee> {
    const newEmployee = new EmployeeModel(data);
    return await newEmployee.save();
  }

  async find(query?: Query): Promise<Employee[]> {
    return await EmployeeModel.find(query || {}).exec();
  }

  async findById(id: string): Promise<Employee | null> {
    return await EmployeeModel.findById(id).exec();
  }
  async findOne(query: Query): Promise<Employee | null> {
    return await EmployeeModel.findOne(query).exec();
  }

  async update(id: string, data: Partial<Employee>): Promise<Employee | null> {
    return await EmployeeModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const deleted = EmployeeModel.findByIdAndDelete(id).exec();
    return deleted !== null;
  }
}