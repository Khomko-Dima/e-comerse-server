

export const TYPES = {
	Application: Symbol.for('Application'),
	ILogger: Symbol.for('ILogger'),
	ExeptionFilter: Symbol.for('ExeptionFilter'),

	ConfigService: Symbol.for('ConfigService'),
	PrismaService: Symbol.for('PrismaService'),

	UserController: Symbol.for('UserController'),
	UserService: Symbol.for('UsersService'),
	UsersRepository: Symbol.for('UsersRepository'),

	ProductsRepository: Symbol.for('ProductsRepository'),
	ProductsService: Symbol.for('ProductsService'),
	ProductsController: Symbol.for('ProductsController'),
};
