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
// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });
app.use((0, cors_1.default)({
    // Cambia esto según tu configuración
    // origin: 'http://localhost:5173',
    origin: 'https://react-full-stack-dashboard.vercel.app/',
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
}));
app.use('/', (0, routes_1.default)());
//* SOLO PARA USO LOCAL
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//*
// Manejador de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Algo salió mal!', err });
});
exports.default = app;
