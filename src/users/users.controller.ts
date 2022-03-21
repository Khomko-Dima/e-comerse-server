import { BaseController } from "../common/base.controller";
import { LoggerService } from '../logger/logger.service';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from "../errors/http-error.class";
const fs = require('fs');
const path = require("path");
export class UserController extends BaseController {
    constructor(logger: LoggerService) {
        super(logger);
        this.bindRoutes([
            {path: '/register', method: 'post', func: this.register},
            {path: '/login', method: 'post', func: this.login},
            {path: '/test', method: 'post', func: this.test},
        ])
    }
    login(req: Request, res: Response, next: NextFunction) {
        next(new HTTPError(401, 'Ошибка авторизации', 'login'))
    }
    register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'register')
    }
    async test(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await testq()
            this.send(res, 200, data)
        } catch (error) {
            console.log(error);
            
        }
    }
}
async function testq() {
    const path = process.cwd() + '/db/db.json'
    
    let rawdata = await fs.readFileSync(path);
    return JSON.parse(rawdata);
}