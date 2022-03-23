import { IsNumber, IsString } from "class-validator";

export class ProductCreateDto {

	@IsString({message: 'Неверно указано название'})
	title: string;

	@IsNumber()
	prise: number
}
