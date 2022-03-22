import { UsersService } from "./users/users.service";

export const TYPES = {
	Application: Symbol.for('Aplication'),
	ILogger: Symbol.for('ILogger'),
	UserController: Symbol.for('UserController'),
	UsersService: Symbol.for('UsersService'),
	ExeptionFilter: Symbol.for('ExeptionFilter'),
};
