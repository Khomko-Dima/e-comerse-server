import { IsEmail, IsString } from "class-validator";

export class UserRegisterDto {
	@IsEmail({}, {message: 'Неверно указан Email'})
	email: string;

	@IsString({message: 'Неверно указан пароль'})
	password: string;

	@IsString({message: 'Не указано имя'})
	name: string;
}
