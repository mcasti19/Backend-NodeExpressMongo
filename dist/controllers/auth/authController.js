"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.revalidarToken = exports.loginUser = exports.registerUser = void 0;
const repositories_1 = require("../../repositories");
const services_1 = require("../../services");
const jwt_1 = require("../../helpers/jwt");
//* Inyeccion de Dependencias
const userRepository = new repositories_1.UserRepository();
const userService = new services_1.UserService(userRepository);
const registerUser = async (req, res) => {
    try {
        const { email } = req.body;
        const userRegistered = await userService.findUserByEmail(email);
        if (userRegistered) {
            res.status(400).json({ message: 'Email already Exists!!' });
            return;
        }
        const newUser = await userService.createUser(req.body);
        res.status(201).json({ message: 'user created successfully', newUser });
    }
    catch (error) {
        console.log('Error >>', error);
        res.status(500).json(error);
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.findUserByEmail(email);
        if (!user) {
            res.status(400).json({ message: "Invalid user or password" });
            return;
        }
        const comparePass = await user.comparePassword(password);
        if (!comparePass) {
            res.status(400).json({ message: "Invalid user or password" });
            return;
        }
        try {
            const token = await (0, jwt_1.generarJWT)(user._id, user.username);
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
        }
        catch (error) {
            console.log("error :>> ", error);
            res.status(500).json(error);
        }
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.loginUser = loginUser;
const revalidarToken = async (req, res) => {
    const user = req.currentUser;
    //* Generating new Token
    try {
        const token = await (0, jwt_1.generarJWT)(user.id, user.name);
        res.status(200).json({
            msg: 'Revalidating Token',
            ok: true,
            user,
            token,
        });
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.revalidarToken = revalidarToken;
