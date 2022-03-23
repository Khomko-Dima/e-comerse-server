import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ExeptionFilter } from './errors/exeption.filter';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { ILogger } from './logger/logger.interfece';
import { TYPES } from './types';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { UserService } from "./users/users.service";
import { IUserService } from "./users/users.service.interface";
import { IUserController } from "./users/users.controller.interface";
import { IConfigService } from "./config/config.service.interface";
import { ConfigService } from "./config/config.service";
import { PrismaService } from './common/prisma.service';
import { IUserRepository } from './users/users.repository.interface';
import { UsersRepository } from './users/users.repository'
import { IProductsRepository } from "./products/products.repository.interface";
import { ProductsRepository } from "./products/products.repository";
import { ProductsService } from "./products/products.service";
import { IProductsService } from "./products/products.service.interface";
import { IProductsController } from "./products/products.controller.interface";
import { ProductsController } from "./products/products.controller";

export interface IBootstrap {
	appContainer: Container;
	app: App;
}
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();

	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
	bind<IUserService>(TYPES.UserService).to(UserService);

	bind<IProductsRepository>(TYPES.ProductsRepository).to(ProductsRepository).inSingletonScope();
	bind<IProductsController>(TYPES.ProductsController).to(ProductsController);
	bind<IProductsService>(TYPES.ProductsService).to(ProductsService);

	bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrap {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();

