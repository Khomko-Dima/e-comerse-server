import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interfece';
import { TYPES } from '../types';
import 'reflect-metadata';
import { ValidateMiddleware } from "../common/validate.middleware";
import { AuthGuard } from "../common/auth.guard";
import { IProductsController } from "./products.controller.interface";
import { ProductCreateDto } from "./dto/product-create.dto";
import { IProductsService } from "./products.service.interface";
import { HTTPError } from "../errors/http-error.class";

@injectable()
export class ProductsController extends BaseController implements IProductsController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.ProductsService) private productsService: IProductsService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/create',
				method: 'post',
				func: this.create,
				middlewares: [
					new ValidateMiddleware(ProductCreateDto),
					// new AuthGuard()
				]
			},
		]);
	}
	async create({body}: Request<{}, {}, ProductCreateDto>, res: Response, next: NextFunction): Promise<void> {
		const result = await this.productsService.createProduct(body)
		this.loggerService.log('Продукт создан')
		if (!result) {
			return next(new HTTPError(422, 'Не удалось создать продукт'))
		}
		this.ok(res, {});
	}
}

