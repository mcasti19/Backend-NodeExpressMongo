import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import 'module-alias/register';

// Importa tus rutas y configuración de base de datos
import "./config/db";
import routes from "./routes/routes";

const app: Application = express();

app.use(express.json());
app.use(morgan("dev"));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/', routes());



//* SOLO PARA USO LOCAL
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
//*



// Manejador de errores global
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

export default app;