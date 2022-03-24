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
import { ProductDeleteDto } from "./dto/product-delete.dto";
import { ProductGetDto } from "./dto/product-get.dto";

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
					new AuthGuard()
				]
			},{
				path: '/delete',
				method: 'delete',
				func: this.delete,
				middlewares: [
					new ValidateMiddleware(ProductDeleteDto),
					new AuthGuard()
				]
			},{
				path: '/search',
				method: 'post',
				func: this.get,
				middlewares: [
					new ValidateMiddleware(ProductGetDto),
				]
			},{
				path: '/product',
				method: 'get',
				func: this.get,
				middlewares: [
					new ValidateMiddleware(ProductGetDto),
				]
			},
		]);
	}
	create({body}: Request<{}, {}, ProductCreateDto>, res: Response, next: NextFunction): void {
		const result = this.productsService.createProduct(body)
		this.loggerService.log('Продукт создан')
		if (!result) {
			return next(new HTTPError(422, 'Не удалось создать продукт'))
		}
		this.ok(res, {});
	}
	delete({body}: Request<{}, {}, ProductDeleteDto>, res: Response, next: NextFunction): void {
		const result = this.productsService.deleteProduct(body)
		this.loggerService.log('Продукт удален')
		if (!result) {
			return next(new HTTPError(422, 'Не удалось удалить продукт'))
		}
		this.ok(res, {});
	}
	get({body}: Request<{}, {}, Omit<ProductGetDto, 'product'>>, res: Response, next: NextFunction): void {
		const result = this.productsService.getProducts(body)
		if (!result) {
			return next(new HTTPError(422, 'Не удалось получить продукты'))
		}
		this.ok(res, result);
	}
	getById({params}: Request<{}, {}, {}>, res: Response, next: NextFunction): void {
		const result = this.productsService.getProduct(req.params?.id)
		if (!result) {
			return next(new HTTPError(422, 'Не удалось получить продукт'))
		}
		this.ok(res, result);
	}

}

