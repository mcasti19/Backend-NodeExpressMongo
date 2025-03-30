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
    return await EmployeeModel.find(query || {})
      .populate("userId")
      .exec();
  }

  async findById(id: string): Promise<Employee | null> {
    return await EmployeeModel.findById(id)
      .populate("userId")
      .exec();
  }
  async findOne(query: Query): Promise<Employee | null> {
    return await EmployeeModel.findOne(query)
      .populate("userId")
      .exec();
  }

  async update(id: string, data: Partial<Employee>): Promise<Employee | null> {
    return await EmployeeModel.findByIdAndUpdate(id, data, { new: true })
      .populate("userId")
      .exec();
  }

  async delete(id: string): Promise<boolean> {
    const deleted = EmployeeModel.findByIdAndDelete(id).exec();
    return deleted !== null;
  }


  async findPaginated(page: number, pageSize: number, query?: Query): Promise<{ employees: Employee[], totalEmployees: number }> {
    const skip = (page - 1) * pageSize;
    const [ employees, totalEmployees ] = await Promise.all([
      EmployeeModel.find(query || {})
        .skip(skip)
        .limit(pageSize)
        .populate("userId")
        .exec(),
      EmployeeModel.countDocuments(query || {})
    ]);
    return { employees, totalEmployees };
  }
}