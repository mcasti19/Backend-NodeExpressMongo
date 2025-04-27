import { Document, ObjectId } from "mongoose";
import { Query, Repository } from "./RepositoryTypes";
import { Roles } from "./RolesTypes";
import { z } from "zod";
import { Employee } from "./EmployeeTypes";

export interface User extends Document {
  img_profile?: Employee;
  name: string;
  username: string;
  email: string;
  password: string;
  roles?: Roles[];
  permissions?: string[];
  employeeId?: ObjectId;
  status: string;
  comparePassword(password: string): Promise<boolean>;
}

export type CreateUser = Partial<User>;


export interface IUserRepository extends Repository<User> {
  findOne(query: Query): Promise<User | null>;
  findPaginated(page: number, pageSize: number, query?: Query): Promise<{ users: User[], totalUsers: number }>;
}

export interface PaginatedResponse<T> {
  users: T[];
  metadata: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
  };
}

export interface IUserService {
  createUser(user: CreateUser): Promise<User>;
  findAllUsers(query?: Query): Promise<User[]>;
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  updateUser(id: string, user: Partial<User>): Promise<User | null>;
  deleteUser(id: string): Promise<boolean>;
  findUsersPaginated(page: number, pageSize: number, query?: Query): Promise<PaginatedResponse<User>>;
}

export const UserSchemaValidation = z.object({
  name: z.string(),
  username: z.string().min(4),
  email: z.string().email(),
  password: z.string().refine(
    val => val.length > 5,
    val => ({ message: `${val} is not more than 6 characters` })
  )
});