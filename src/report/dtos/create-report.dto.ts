import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReportDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsNumber()
    issueType!: number;

    @IsNotEmpty()
    @IsString()
    location!: string;

    @IsNotEmpty()
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