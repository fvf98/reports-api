import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PerformanceService } from './performance.service';

@ApiTags('Performance')
@Controller('performance')
export class PerformanceController {
    constructor(
        private readonly performanceService: PerformanceService
    ) { }

    @Get()
    async getAll() {
        const data = await this.performanceService.getAll();

        return { data };
    }

    @Post()
    async getByMount(@Body() dto: { date: string }) {
        const data = await this.performanceService.getByMount(dto.date);

        return { data };
    }
}
