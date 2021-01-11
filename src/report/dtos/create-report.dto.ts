import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateReportDto {
    @IsString()
    title: string;

    @IsNumber()
    troubleType!: number;

    @IsString()
    location!: string;

    @IsString()
    description!: string;

    @IsString({ each: true })
    @IsArray()
    images: string[];

    @IsNumber()
    asigned: number;

    @IsNumber()
    author: number;
}