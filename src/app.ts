import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/users', UserRoutes);

const serverController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to User Server',
  });
};

app.get('/', serverController);

export default app;
