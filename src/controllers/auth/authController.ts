import { Request, Response } from 'express';
import { UserRepository } from '../../repositories';
import { UserService } from '../../services';
import { IUserService, IUserRepository, User } from '../../types/UsersTypes';
import jwt from "jsonwebtoken";
import { permissions } from '../../types/PermissionsTypes';
import { generarJWT } from "../../helpers/jwt";


//* Inyeccion de Dependencias
const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);


export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email }: User = req.body;
        const userRegistered = await userService.findUserByEmail(email);
        if (userRegistered) {
            res.status(400).json({ message: 'Email already Exists!!' });
            return
        }

        const newUser = await userService.createUser(req.body);
        res.status(201).json({ message: 'user created successfully', newUser })

    } catch (error) {
        console.log('Error >>', error);
        res.status(500).json(error)
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password }: User = req.body;
        const user = await userService.findUserByEmail(email);

        if (!user) {
            res.status(400).json({ message: "Invalid user or password" });
            return
        }

        const comparePass = await user.comparePassword(password);
        if (!comparePass) {
            res.status(400).json({ message: "Invalid user or password" });
            return
        }

        try {
            const token = await generarJWT(user._id as string, user.username as string);
            res.status(200).json({
                message: 'user authenticated successfully',
                user: {
                    id: user._id,
                    name: user.username,
                    email: user.email,
                    role: user.roles ? user.roles.map(role => role.name) : [],
                    permissions: user.permissions,
                    status: user.status,
                    token
                }
            });
        } catch (error) {
            console.log("error :>> ", error);
            res.status(500).json(error);
        }
    } catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};


export const revalidarToken = async (req: Request, res: Response) => {
    const user = req.currentUser;
    //* Generating new Token
    try {
        const token = await generarJWT(user.id as string, user.name);
        res.status(200).json({
            msg: 'Revalidating Token',
            ok: true,
            user,
            token,
        });
    } catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
}