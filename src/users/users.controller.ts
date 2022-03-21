import { BaseController } from "../common/base.controller";
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from "../errors/http-error.class";
import { inject, injectable } from "inversify";
import { ILogger } from "../logger/logger.interfece";
import { TYPES } from "../types";
import 'reflect-metadata'
@injectable()
export class UserController extends BaseController {
    constructor(@inject(TYPES.ILogger) private loggerServise: ILogger) {
        super(loggerServise);
        this.bindRoutes([
            {path: '/register', method: 'post', func: this.register},
            {path: '/login', method: 'post', func: this.login},
        ])
    }
    login(req: Request, res: Response, next: NextFunction) {
        next(new HTTPError(401, 'Ошибка авторизации', 'login'))
    }
    register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'register')
    }
}