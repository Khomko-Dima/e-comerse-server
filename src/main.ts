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
export interface IBootstrap {
	appContainer: Container;
	app: App;
}
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<IUserRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
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

