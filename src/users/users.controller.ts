import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interfece';
import { TYPES } from '../types';
import 'reflect-metadata';
import { IUserController } from './users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from "./dto/user-registr.dto";
import { IUserService } from "./users.service.interface";
import { ValidateMiddleware } from "../common/validate.middleware";
import {sign} from 'jsonwebtoken'
import { IConfigService } from "../config/config.service.interface";
import { AuthGuard } from "../common/auth.guard";

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private usersService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)]
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)]
			},
			{
				path: '/info',
				method: 'get',
				func: this.info,
				middlewares: [new AuthGuard()]
			},
		]);
	}
	async login({body}: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): Promise<void> {
		const result = await this.usersService.validateUser(body)
		if (!result) {
			return next(new HTTPError(401, 'Ошибка авторизации', 'login'));
		}
		const jwt = await this.signJWT(body.email, this.configService.get('SECRET_JWT'))
		this.ok(res, {jwt})
	}
	async register({ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): Promise<void> {
		const result = await this.usersService.createUser(body)
		this.loggerService.log(result)
		if (!result) {
			return next(new HTTPError(422, 'Такой пользователь уже существует'))
		}
		this.ok(res, {email: result.email, name: result.name, id: result.id});
	}
	async info({user}: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): Promise<void> {
		const userInfo = await this.usersService.getUserInfo(user)
		this.ok(res, {email: userInfo?.email, id: userInfo?.id, name: userInfo?.name })
	}

	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{email, iat: Math.floor(Date.now() / 1000)},
				secret,
				{algorithm: 'HS256'},
				(err, token) => {
					if (err) reject(err)
					resolve(token as string)
				}
			);
		})
	}
}

