import { IsNotEmpty, IsString } from "class-validator";

export class CreateReportDto {
    @IsNotEmpty()
    @IsString()
    title: string;
}