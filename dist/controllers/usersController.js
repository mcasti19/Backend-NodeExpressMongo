"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const repositories_1 = require("../repositories");
const services_1 = require("../services");
//* Dependency Injection
const userRepository = new repositories_1.UserRepository();
const userService = new services_1.UserService(userRepository);
const createUser = async (req, res) => {
    try {
        // const newUser: User = req.body
        // const createdUser = await userService.createUser(newUser)
        const { username, password, roles, employeeId } = req.body;
        // Buscar el empleado correspondiente en la base de datos
        const employeeRepository = new repositories_1.EmployeeRepository();
        const employee = await employeeRepository.findById(employeeId);
        if (!employee) {
            res.status(404).json({ message: 'Employee Not Found' });
            return;
        }
        // Create the user with the employee's data
        const user = {
            name: employee.name,
            email: employee.email,
            username,
            password,
            roles,
            employeeId,
        };
        const createdUser = await userService.createUser(user);
        await employeeRepository.update(employeeId, { userId: createdUser._id });
        res.status(201).json({ msg: 'User created successfully', createdUser });
    }
    catch (error) {
        console.log('Error >>', error);
        res.status(400).json(error);
    }
};
exports.createUser = createUser;
const getUsers = async (req, res) => {
    try {
        const users = await userService.findUsers();
        if (users.length === 0) {
            res.status(404).json({ message: 'No users Found' });
            return;
        }
        res.status(200).json(users);
    }
    catch (error) {
        console.log('Error >>', error);
        res.status(500).json({ error: 'Users loading Failed' });
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userService.findUserById(id);
        if (!user) {
            res.status(404).json({ message: 'User ID NOT Found' });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.log('Error >>', error);
        res.status(400).json({ error: 'User Search Failed' });
    }
};
exports.getUserById = getUserById;
const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.body;
        const result = await userService.updateUser(id, user);
        console.log(result);
        res.status(200).json(result);
    }
    catch (error) {
        console.log('Error >>', error);
        res.status(400).json({ error: 'User Update Failed' });
    }
};
exports.updateUserById = updateUserById;
const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await userService.deleteUser(id);
        console.log(deletedUser);
        res.status(200).json(deletedUser);
    }
    catch (error) {
        console.log('Error >>', error);
        res.status(404).json({ error: 'User Deletion Failed' });
    }
};
exports.deleteUserById = deleteUserById;
