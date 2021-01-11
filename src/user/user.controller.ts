import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResource } from 'src/app.roles';
import { Auth, User } from 'src/common/decorators';
import { CreateUserDto, EditUserDto } from './dtos';
import { UserService } from './user.service';
import { User as UserEntity } from './entities';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
@ApiTags('Users')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder,
    ) { }

    @Get()
    async getMany() {
        const data = await this.userService.getMany();
        return { data };
    }

    @Get(':id')
    async getOne(@Param('id') id: number) {
        const data = await this.userService.getOne(id);
        return { data };
    }

    @Auth({
        possession: 'any',
        action: 'create',
        resource: AppResource.USER,
    })
    @Post()
    async createOne(@Body() dto: CreateUserDto) {
        const data = await this.userService.createOne(dto);
        return { message: 'User created', data };
    }

    @Auth({
        possession: 'own',
        action: 'update',
        resource: AppResource.USER,
    })
    @Put(':id')
    async editOne(
        @Param('id') id: number,
        @Body() dto: EditUserDto,
        @User() user: UserEntity,
    ) {
        let data;

        if (this.rolesBuilder.can(user.roles).updateAny(AppResource.USER).granted) {
            // esto es un admin
            data = await this.userService.editOne(id, dto);
        } else {
            // esto es un author
            const { roles, ...rest } = dto;
            data = await this.userService.editOne(id, rest, user);
        }
        return { message: 'User edited', data };
    }

    @Auth({
        action: 'delete',
        possession: 'own',
        resource: AppResource.USER,
    })
    @Delete(':id')
    async deleteOne(@Param('id') id: number, @User() user: UserEntity) {
        let data;

        if (this.rolesBuilder.can(user.roles).updateAny(AppResource.USER).granted) {
            // esto es un admin
            data = await this.userService.deleteOne(id);
        } else {
            // esto es un author
            data = await this.userService.deleteOne(id, user);
        }
        return { message: 'User deleted', data };
    }
}
