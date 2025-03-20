import { Request, Response } from 'express';
import { UserRepository } from '../../repositories';
import { UserService } from '../../services';
import { IUserService, IUserRepository, User } from '../../types/UsersTypes';
import jwt from "jsonwebtoken";

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
    const jwtSecret = process.env.JWT_SECRET as string;
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

        const token = jwt.sign({ id: user._id, email: user.email, name: user.username }, jwtSecret, { expiresIn: '1h' });

        console.log("USERRRRR >>>>", user);
        res.status(200).json({
            id: user._id,
            name: user.username,
            email: user.email,
            role: user.roles ? user.roles.map(role => role.name) : [], // Comprueba si user.roles es definido
            token
        });
    } catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};



export const revalidarToken = async (req: Request, res: Response) => {
    const jwtSecret = process.env.JWT_SECRET as string;
    const { id, name, email }: User = req.body;
    const user = await userService.findUserByEmail(email);
    console.log(user);

    if (!user) {
        res.status(400).json({ message: "Invalid username or password, token cannot be revalidated" });
        return
    }

    //* Generating new Token
    // const token = await generarJWT(uid, name);
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            name: user.username
        }, jwtSecret, { expiresIn: '1h' });

    res.json({
        msg: 'Revalidating Token',
        ok: true,
        name,
        id,
        email,
        token,
    })
}