import { Request, Response } from "express";
import { EmployeeRepository, UserRepository } from "../repositories";
import { UserService } from "../services";

import { IUserService, IUserRepository, CreateUser, User } from "../types/UsersTypes";
import { ObjectId } from "mongoose";

//* Dependency Injection
const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository)


export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        // const newUser: User = req.body
        // const createdUser = await userService.createUser(newUser)
        const { username, password, roles, employeeId } = req.body;

        // Buscar el empleado correspondiente en la base de datos
        const employeeRepository = new EmployeeRepository();
        const employee = await employeeRepository.findById(employeeId);

        if (!employee) {
            res.status(404).json({ message: 'Employee Not Found' });
            return;
        }

        // Create the user with the employee's data
        const user: CreateUser = {
            name: employee.name,
            email: employee.email,
            username,
            password,
            roles,
            employeeId,
        };

        const createdUser = await userService.createUser(user);
        await employeeRepository.update(employeeId, { userId: createdUser._id as ObjectId });

        res.status(201).json({ msg: 'User created successfully', createdUser });

    } catch (error) {
        console.log('Error >>', error);
        res.status(400).json(error)
    }
}

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await userService.findUsers();
        if (users.length === 0) {
            res.status(404).json({ message: 'No users Found' });
            return
        }
        res.status(200).json(users);

    } catch (error) {
        console.log('Error >>', error);
        res.status(500).json({ error: 'Users loading Failed' })
    }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id
        const user = await userService.findUserById(id)
        if (!user) {
            res.status(404).json({ message: 'User ID NOT Found' });
            return
        }
        res.status(200).json(user);

    } catch (error) {
        console.log('Error >>', error);
        res.status(400).json({ error: 'User Search Failed' })
    }
}

export const updateUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: string = req.params.id
        const user: User = req.body
        const result = await userService.updateUser(id, user)
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.log('Error >>', error);
        res.status(400).json({ error: 'User Update Failed' })
    }
}

export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: string = req.params.id;
        const deletedUser = await userService.deleteUser(id);
        console.log(deletedUser);
        res.status(200).json(deletedUser);
    } catch (error) {
        console.log('Error >>', error);
        res.status(404).json({ error: 'User Deletion Failed' })
    }
}