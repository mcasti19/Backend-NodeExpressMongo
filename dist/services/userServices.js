"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(user) {
        return this.userRepository.create(user);
    }
    async findAllUsers(query) {
        return this.userRepository.find(query);
    }
    async findUserById(id) {
        return this.userRepository.findById(id);
    }
    findUserByEmail(email) {
        return this.userRepository.findOne({ email });
    }
    async updateUser(id, user) {
        return this.userRepository.update(id, user);
    }
    async deleteUser(id) {
        return this.userRepository.delete(id);
    }
    async findUsersPaginated(page, pageSize, query) {
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
exports.UserService = UserService;
