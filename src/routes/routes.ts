import { Router } from "express";
import { checkRoles } from "../middlewares/roles";
import { getPermission, verifyToken } from "../middlewares/auth";
import { loginUser, registerUser } from "../controllers/auth/authController";

import {
    deleteUserById,
    getUserById,
    getUsers,
    createUser,
    updateUserById,
    deleteRoleById,
    getRoleById,
    getRoles,
    registerRole,
    updateRoleById,
    createEmployee,
    deleteEmployee,
    findEmployeeById,
    findEmployees,
    updateEmployee,
    createInvoice,
    findInvoices,
    findInvoiceById,
    updateInvoice,
    deleteInvoice
} from "../controllers";

const router = Router();

export default () => {
    router.get('/server', (req, res) => {
        res.send("API is Healthy");
    });

    // //******************************************************/AUTH ROUTES
    router.post('/auth/register', checkRoles, registerUser);
    router.post('/auth/login', loginUser);

    // //*****************************************************/ ROLES ROUTES
    router.post('/roles', verifyToken, getPermission, registerRole)
    router.get('/roles', verifyToken, getPermission, getRoles)
    router.get('/roles/:id', verifyToken, getPermission, getRoleById)
    router.put('/roles/:id', verifyToken, getPermission, updateRoleById)
    router.delete('/roles/:id', verifyToken, getPermission, deleteRoleById);

    // //***************************************************/ USERS ROUTES
    router.post('/users', verifyToken, getPermission, checkRoles, createUser);
    router.get('/users', verifyToken, getPermission, getUsers);
    router.get('/users/:id', verifyToken, getPermission, getUserById)
    router.put('/users/:id', verifyToken, getPermission, updateUserById)
    router.delete('/users/:id', verifyToken, getPermission, deleteUserById);

    // //*****************************************************/ INVOICES ROUTES
    router.post('/invoices', verifyToken, getPermission, createInvoice)
    router.get('/invoices', verifyToken, getPermission, findInvoices)
    router.get('/invoices/:id', verifyToken, getPermission, findInvoiceById)
    router.put('/invoices/:id', verifyToken, getPermission, updateInvoice)
    router.delete('/invoices/:id', verifyToken, getPermission, deleteInvoice);

    // //****************************************************/ EMPLOYEES ROUTES
    router.post("/employees", verifyToken, getPermission, createEmployee);
    router.get("/employees", findEmployees);
    router.get("/employees/:id", findEmployeeById);
    router.put("/employees/:id", verifyToken, getPermission, updateEmployee);
    router.delete("/employees/:id", verifyToken, getPermission, deleteEmployee);

    return router
};