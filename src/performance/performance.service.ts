import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities';
import { Repository } from 'typeorm';
import { Performance } from './entities/performance.entity';
@Injectable()
export class PerformanceService {
    constructor(
        @InjectRepository(Performance)
        private readonly performanceRepository: Repository<Performance>,
    ) { }

    async getByMount(date: string) {
        const performance = await this.performanceRepository.find({
            where: {
                date
            },
            order: {
                tasks: 'DESC'
            }
        })
        return performance;
    }

    async getAll() {
        const performance = await this.performanceRepository.find();

        return performance;
    }

    async addTask(user: User) {
        const date = new Date().getMonth() + 1 + ' ' + new Date().getFullYear();

        const performance = await this.performanceRepository.findOne({
            where: {
                janitor: user,
                date
            }
        })

        let task;

        if (performance) task = Object.assign(performance, { tasks: performance.tasks + 1 });
        else task = this.performanceRepository.create({ janitor: user, date });

        return await this.performanceRepository.save(task);
    }
}
