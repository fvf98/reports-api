import { PartialType, OmitType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateReportDto } from './create-report.dto';

export class EditReportDto extends PartialType(
  OmitType(CreateReportDto, ['author'] as const),
) {
  @IsNumber()
  asigned: number;
}
