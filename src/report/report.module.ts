import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities';
import { PerformanceModule } from 'src/performance/performance.module';

@Module({
  imports: [TypeOrmModule.forFeature([Report]), PerformanceModule],
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportModule { }
