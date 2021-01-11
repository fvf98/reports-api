import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIssueDto } from './dtos';
import { Issue } from './entities';

@Injectable()
export class IssueService {
    constructor(
        @InjectRepository(Issue)
        private readonly issueRepository: Repository<Issue>,
    ) { }

    async getMany() {
        return await this.issueRepository.find();
    }

    async getById(id: number) {
        const issue = await this.issueRepository
            .findOne(id);
        if (!issue)
            throw new NotFoundException('Issue does not exist');
        return issue;
    }

    async createOne(dto: CreateIssueDto) {
        return await this.issueRepository.save(dto);
    }

    async editOne(id: number, dto: CreateIssueDto) {
        const issue = await this.getById(id);
        const editedIssue = Object.assign(issue, dto);
        return await this.issueRepository.save(editedIssue);
    }

    async deleteOne(id: number) {
        const issue = await this.getById(id);
        return await this.issueRepository.remove(issue);
    }
}
