"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roles_1 = require("../middlewares/roles");
const auth_1 = require("../middlewares/auth");
const authController_1 = require("../controllers/auth/authController");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
exports.default = () => {
    router.get('/', (req, res) => {
        res.send("API is Healthy");
    });
    // //******************************************************/AUTH ROUTES
    router.post('/auth/register', roles_1.checkRoles, authController_1.registerUser);
    router.post('/auth/login', authController_1.loginUser);
    router.get('/auth/renew', auth_1.verifyToken, authController_1.revalidarToken);
    // //*****************************************************/ ROLES ROUTES
    router.post('/roles', auth_1.verifyToken, auth_1.getPermission, controllers_1.registerRole);
    router.get('/roles', auth_1.verifyToken, auth_1.getPermission, controllers_1.getRoles);
    router.get('/roles/:id', auth_1.verifyToken, auth_1.getPermission, controllers_1.getRoleById);
    router.put('/roles/:id', auth_1.verifyToken, auth_1.getPermission, controllers_1.updateRoleById);
    router.delete('/roles/:id', auth_1.verifyToken, auth_1.getPermission, controllers_1.deleteRoleById);
    // //***************************************************/ USERS ROUTES
    router.post('/users', auth_1.verifyToken, auth_1.getPermission, roles_1.checkRoles, controllers_1.createUser);
    router.get('/users', auth_1.verifyToken, auth_1.getPermission, controllers_1.getUsers);
    router.get('/users/:id', auth_1.verifyToken, auth_1.getPermission, controllers_1.getUserById);
    router.put('/users/:id', auth_1.verifyToken, auth_1.getPermission, controllers_1.updateUserById);
    router.delete('/users/:id', auth_1.verifyToken, auth_1.getPermission, controllers_1.deleteUserById);
    // //*****************************************************/ INVOICES ROUTES
    router.post('/invoices', auth_1.verifyToken, auth_1.getPermission, controllers_1.createInvoice);
    router.get('/invoices', auth_1.verifyToken, auth_1.getPermission, controllers_1.findInvoices);
    router.get('/invoices/:id', auth_1.verifyToken, auth_1.getPermission, controllers_1.findInvoiceById);
    router.put('/invoices/:id', auth_1.verifyToken, auth_1.getPermission, controllers_1.updateInvoice);
    router.delete('/invoices/:id', auth_1.verifyToken, auth_1.getPermission, controllers_1.deleteInvoice);
    // //****************************************************/ EMPLOYEES ROUTES
    router.post("/employees", auth_1.verifyToken, auth_1.getPermission, controllers_1.createEmployee);
    router.get("/employees", controllers_1.findEmployees);
    router.get("/employees/:id", controllers_1.findEmployeeById);
    router.put("/employees/:id", auth_1.verifyToken, auth_1.getPermission, controllers_1.updateEmployee);
    router.delete("/employees/:id", auth_1.verifyToken, auth_1.getPermission, controllers_1.deleteEmployee);
    return router;
};
