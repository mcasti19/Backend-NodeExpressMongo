import { Query } from "../types/RepositoryTypes";
import { IUserRepository, IUserService, PaginatedResponse, User } from "../types/UsersTypes";

export class UserService implements IUserService {
    private userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async createUser(user: User): Promise<User> {
        return this.userRepository.create(user)
    }

    async findAllUsers(query?: Query): Promise<User[]> {
        return this.userRepository.find(query)
    }

    async findUserById(id: string): Promise<User | null> {
        return this.userRepository.findById(id)
    }

    findUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ email });
    }

    async updateUser(id: string, user: Partial<User>): Promise<User | null> {
        return this.userRepository.update(id, user)
    }

    async deleteUser(id: string): Promise<boolean> {
        return this.userRepository.delete(id)
    }

    async findUsersPaginated(page: number, pageSize: number, query?: Query): Promise<PaginatedResponse<User>> {
        const { users, totalUsers } = await this.userRepository.findPaginated(page, pageSize, query);
        const totalPages = Math.ceil(totalUsers / pageSize);
        return {
            users,
            metadata: {
                currentPage: page,
                totalPages,
                totalItems: totalUsers,
                pageSize
            }
        };
    }
}