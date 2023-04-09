import { Response, Request } from 'express';

export const logger = (req: Request, res: Response, next) => {
  console.log('je suis le logger middelware !');
  next();
};
