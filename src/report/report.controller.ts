import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Reports')
@Controller('report')
export class ReportController { }
