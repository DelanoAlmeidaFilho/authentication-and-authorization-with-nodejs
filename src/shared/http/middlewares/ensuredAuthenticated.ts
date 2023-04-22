import { Request, Response, NextFunction } from 'express';
import { decode, verify } from 'jsonwebtoken';
import { AppError } from 'shared/error/AppError';

export const ensuredAuthenticated = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authHeaders = req.headers.authorization;

        if (!authHeaders) {
            throw new AppError('Token missing', 401);
        }

        const [, token] = authHeaders.split(' ');

        try {
            verify(token, process.env.SECRET_TOKEN);

            const { sub } = decode(token);
            req.userId = sub.toString();

            return next();
        } catch (err) {
            throw new AppError('Invalid token!', 401);
        }
    };
};
