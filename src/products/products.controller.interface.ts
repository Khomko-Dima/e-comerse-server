import { NextFunction, Response, Request } from 'express';

export interface IProductsController {
	create: (req: Request, res: Response, next: NextFunction) => void;
	delete: (req: Request, res: Response, next: NextFunction) => void;
	get: (req: Request, res: Response, next: NextFunction) => void;
	getByIds: (req: Request, res: Response, next: NextFunction) => void;
	getOne: (req: Request, res: Response, next: NextFunction) => void;
}
