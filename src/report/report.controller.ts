import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResource } from 'src/app.roles';
import { User, Auth, Issue } from 'src/common/decorators';
import { Issue as IssueEntity } from 'src/issue/entities';
import { User as UserEntity } from 'src/user/entities';
import { CreateReportDto, EditReportDto } from './dtos';
import { ReportService } from './report.service';

@ApiTags('Reports')
@Controller('report')
export class ReportController {
    constructor(
        private readonly reportService: ReportService,
        @InjectRolesBuilder()
        private readonly roleBuilder: RolesBuilder,
    ) { }

    @Get()
    async getMany() {
        const data = await this.reportService.getMany();
        return { data };
    }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number) {
        const data = await this.reportService.getById(id);
        return { data };
    }

    @Auth({
        resource: AppResource.REPORT,
        action: 'create',
        possession: 'own',
    })
    @Post()
    async createOne(@Body() dto: CreateReportDto, @Issue() issueType: IssueEntity, @User() author: UserEntity) {
        const data = await this.reportService.createOne(dto, issueType, author);
        return { message: 'Report created', data };
    }

    @Auth({
        resource: AppResource.REPORT,
        action: 'update',
        possession: 'own',
    })
    @Put(':id')
    async editOne(
        @Param('id') id: number,
        @Body() dto: EditReportDto,
        @User() author: UserEntity,
    ) {
        let data;

        if (
            this.roleBuilder.can(author.roles).updateAny(AppResource.REPORT).granted
        ) {
            // Puede editar cualquier POST...
            data = await this.reportService.editOne(id, dto);
        } else {
            // Puede editar solo los propios...
            data = await this.reportService.editOne(id, dto, author);
        }

        return { message: 'Report edited', data };
    }

    @Auth({
        resource: AppResource.REPORT,
        action: 'update',
        possession: 'own',
    })
    @Get('/finish/:id')
    async finishOne(
        @Param('id') id: number
    ) {
        const data = await this.reportService.finishOne(id);
        return { message: 'Report edited', data };
    }

    @Auth({
        resource: AppResource.REPORT,
        action: 'delete',
        possession: 'own',
    })
    @Delete(':id')
    async deleteOne(@Param('id') id: number, @User() author: UserEntity) {
        let data;

        if (
            this.roleBuilder.can(author.roles).deleteAny(AppResource.REPORT).granted
        ) {
            data = await this.reportService.deleteOne(id);
        } else {
            data = await this.reportService.deleteOne(id, author);
        }
        return { message: 'Report deleted', data };
    }
}
