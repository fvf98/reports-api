import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, EditUserDto } from './dtos';
import { User } from './entities';

export interface UserFindOne {
    id?: number;
    userName?: string;
}

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async getMany() {
        return await this.userRepository.find();
    }

    async getOne(id: number) {
        const user = await this.userRepository.findOne(id);
        if (!user)
            throw new NotFoundException('User does not exists');
        return user;
    }

    async createOne(dto: CreateUserDto) {
        const userExist = await this.userRepository.findOne({ userName: dto.userName });
        if (userExist)
            throw new BadRequestException('User already registered');

        const newUser = this.userRepository.create(dto);
        const user = await this.userRepository.save(newUser);

        delete user.password;
        return user;
    }

    async editOne(id: number, dto: EditUserDto) {
        const user = await this.getOne(id);
        const editedUser = Object.assign(user, dto);
        return await this.userRepository.save(editedUser);
    }

    async deleteOne(id: number) {
        const user = await this.getOne(id);
        return await this.userRepository.remove(user);
    }

    async findOne(data: UserFindOne) {
        return await this.userRepository
            .createQueryBuilder('user')
            .where(data)
            .addSelect('user.password')
            .getOne();
    }

}