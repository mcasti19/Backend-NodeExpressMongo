"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const models_1 = require("../models");
class UserRepository {
    async create(data) {
        const newUser = new models_1.UserModel(data);
        return await newUser.save();
    }
    async find(query) {
        return await models_1.UserModel.find(query || {})
            .populate("roles")
            .populate("employeeId")
            .exec();
    }
    async findById(id) {
        return await models_1.UserModel.findById(id)
            .populate("roles")
            .populate("employeeId")
            .exec();
    }
    async findOne(query) {
        return await models_1.UserModel.findOne(query)
            .populate("roles")
            .populate("employeeId")
            .exec();
    }
    async update(id, data) {
        return await models_1.UserModel.findByIdAndUpdate(id, data, { new: true })
            .populate("roles")
            .populate("employeeId")
            .exec();
    }
    async delete(id) {
        const deleted = models_1.UserModel.findByIdAndDelete(id).exec();
        return deleted !== null;
    }
    async findPaginated(page, pageSize, query) {
        const skip = (page - 1) * pageSize;
        const [users, totalUsers] = await Promise.all([
            models_1.UserModel.find(query || {})
                .skip(skip)
                .limit(pageSize)
                .populate("roles")
                .populate("employeeId")
                .exec(),
            models_1.UserModel.countDocuments(query || {})
        ]);
        return { users, totalUsers };
    }
}
exports.UserRepository = UserRepository;
