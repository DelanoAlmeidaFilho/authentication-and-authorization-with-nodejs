import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { routes } from './routes';
import { handlerError } from './middlewares/handlerError';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(handlerError);

app.listen(8080, () =>
    console.log('server is running in http://localhost:8080'),
);
