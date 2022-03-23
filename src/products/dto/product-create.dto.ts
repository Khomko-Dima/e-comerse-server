import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class ProductCreateDto {

	@IsString({message: 'Неверно указано название'})
	title: string;

	@IsNumber()
	prise: number

	@IsArray()
	category: string[]

	@IsOptional()
	@IsString()
	img?: string
}
