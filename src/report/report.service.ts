import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Issue } from 'src/issue/entities';
import { PerformanceService } from 'src/performance/performance.service';
import { User } from 'src/user/entities';
import { Repository } from 'typeorm';
import { CreateReportDto, EditReportDto } from './dtos';
import { Report } from './entities';

@Injectable()
export class ReportService {
    constructor(
        private readonly performanceService: PerformanceService,
        @InjectRepository(Report)
        private readonly reportRepository: Repository<Report>,
    ) { }

    async getMany() {
        return await this.reportRepository.find();
    }

    async getById(id: number, author?: User) {
        const report = await this.reportRepository
            .findOne(id)
            .then(p => (!author ? p : !!p && author.id === p.author.id ? p : null));
        if (!report)
            throw new NotFoundException('Report does not exist or unauthorized');
        return report;
    }

    async createOne(dto: CreateReportDto, issueType: Issue, author: User) {
        const report = this.reportRepository.create({ ...dto, issueType, author });
        return await this.reportRepository.save(report);
    }

    async editOne(id: number, dto: EditReportDto, author?: User) {
        const report = await this.getById(id, author);
        const editedPost = Object.assign(report, dto);
        return await this.reportRepository.save(editedPost);
    }

    async finishOne(id: number) {
        let dto = await this.getById(id);
        await this.performanceService.addTask(dto.asigned);
        dto.status = "T";
        return await this.reportRepository.save(dto);
    }

    async deleteOne(id: number, author?: User) {
        const report = await this.getById(id, author);
        return await this.reportRepository.remove(report);
    }
}
