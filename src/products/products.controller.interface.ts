import { NextFunction, Response, Request } from 'express';

export interface IProductsController {
	create: (req: Request, res: Response, next: NextFunction) => void;
	delete: (req: Request, res: Response, next: NextFunction) => void;
	get: (req: Request, res: Response, next: NextFunction) => void;
	getById: (req: Request, res: Response, next: NextFunction) => void;
}
