import { NextFunction, Response, Request } from 'express';

export interface IProductsController {
	create: (req: Request, res: Response, next: NextFunction) => void;
	// info: (req: Request, res: Response, next: NextFunction) => void;
}
