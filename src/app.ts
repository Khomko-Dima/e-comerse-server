import express,{Express} from 'express'
import {Server} from 'http'
import { ExeptionFilter } from './errors/exeption.filter';
import { UserController } from './users/users.controller';
import { ILogger } from './logger/logger.interfece';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import 'reflect-metadata'

@injectable()
export class App {
    app: Express
    server: Server
    port: number

    constructor(
        @inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.UserController) private userController: UserController,
        @inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter
    ) {
        this.app = express();
        this.port = 8000;
    }

    useRoutes() {
        this.app.use('/users', this.userController.router)
    }

    useExeptionsFilters() {
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))
    }

    public async init() {
        this.useRoutes();
        this.useExeptionsFilters();
        this.server = this.app.listen(this.port)
        this.logger.log(`Server start on port: ${this.port}`);
        
    }
}