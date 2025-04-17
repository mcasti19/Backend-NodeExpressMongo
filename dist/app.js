"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
require("module-alias/register");
const cors_1 = __importDefault(require("cors"));
// Importa tus rutas y configuración de base de datos
require("./config/db");
const routes_1 = __importDefault(require("./routes/routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
// Configuración optimizada y segura
app.use((0, cors_1.default)({
    origin: [
        'https://react-full-stack-dashboard.vercel.app', // Producción
        'http://localhost:5173' // Desarrollo local
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Authorization'],
    credentials: true,
    maxAge: 86400
}));
app.use('/', (0, routes_1.default)());
//* SOLO PARA USO LOCAL
const port = process.env.PORT || 4000;
console.time('Server startup time');
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
console.timeEnd('Server startup time');
//*
// Manejador de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Algo salió mal!', err });
});
exports.default = app;
