import { UserModel } from "../models";
import { Query } from "../types/RepositoryTypes";
import { IUserRepository, User } from "../types/UsersTypes";

export class UserRepository implements IUserRepository {

  async create(data: User): Promise<User> {
    const newUser = new UserModel(data);
    return await newUser.save();
  }

  async find(query?: Query): Promise<User[]> {
    return await UserModel.find(query || {})
      .populate("roles")
      .populate("employeeId")
      .exec();
  }

  async findById(id: string): Promise<User | null> {
    return await UserModel.findById(id)
      .populate("roles")
      .populate("employeeId")
      .exec();
  }
  async findOne(query: Query): Promise<User | null> {
    return await UserModel.findOne(query)
      .populate("roles")
      .populate("employeeId")
      .exec();

  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    return await UserModel.findByIdAndUpdate(id, data, { new: true })
      .populate("roles")
      .populate("employeeId")
      .exec();
  }

  async delete(id: string): Promise<boolean> {
    const deleted = UserModel.findByIdAndDelete(id).exec();
    return deleted !== null;
  }

  async findPaginated(page: number, pageSize: number, query?: Query): Promise<{ users: User[], totalUsers: number }> {
    const skip = (page - 1) * pageSize;
    const [ users, totalUsers ] = await Promise.all([
      UserModel.find(query || {})
        .skip(skip)
        .limit(pageSize)
        .populate("roles")
        .populate("employeeId")
        .exec(),
      UserModel.countDocuments(query || {})
    ]);
    return { users, totalUsers };
  }
}