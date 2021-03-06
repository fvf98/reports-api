import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResource } from 'src/app.roles';
import { Auth } from 'src/common/decorators';
import { CreateIssueDto } from './dtos';
import { IssueService } from './issue.service';

@ApiTags('Issues')
@Controller('issue')
export class IssueController {
    constructor(
        private readonly issueService: IssueService
    ) { }

    @Get()
    async getMany() {
        const data = await this.issueService.getMany();
        return { data };
    }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number) {
        const data = await this.issueService.getById(id);
        return { data };
    }

    @Auth({
        resource: AppResource.ISSUE,
        action: 'create',
        possession: 'own',
    })
    @Post()
    async createPost(@Body() dto: CreateIssueDto) {
        const data = await this.issueService.createOne(dto);
        return { message: 'Issue created', data };
    }

    @Auth({
        resource: AppResource.ISSUE,
        action: 'update',
        possession: 'own',
    })
    @Put(':id')
    async editOne(@Param('id') id: number, @Body() dto: CreateIssueDto) {
        const data = await this.issueService.editOne(id, dto);
        return { message: 'Issue edited', data };
    }

    @Auth({
        resource: AppResource.ISSUE,
        action: 'delete',
        possession: 'own',
    })
    @Delete(':id')
    async deleteOne(@Param('id') id: number) {
        const data = await this.issueService.deleteOne(id);
        return { message: 'Issue deleted', data };
    }
}
