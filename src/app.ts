const cors = require('cors')
import express, { Express } from "express";
import { Server } from 'http';
import { ILogger } from './logger/logger.interfece';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { json } from 'body-parser';
import 'reflect-metadata';
import { IConfigService } from "./config/config.service.interface";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import { PrismaService } from './common/prisma.service';
import { AuthMiddleware } from "./common/auth.middleware";
import { UserController } from "./users/users.controller";
import { ProductsController } from "./products/products.controller";

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,

		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,

		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ProductsController) private productsController: ProductsController,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		this.app.use(cors({
			credentials: true,
			origin: 'http://localhost:3000'
		}))
		this.app.use(json());
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET_JWT'));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
		this.app.use('/product', this.productsController.router);
	}

	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}


	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExeptionFilters();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server start on port: ${this.port}`);
	}
}
