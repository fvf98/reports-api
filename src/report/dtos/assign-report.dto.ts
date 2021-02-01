import { IsNumber } from "class-validator";

export class AssignReport {
    @IsNumber()
    asigned: number;
}