import { User } from 'src/user/entities';
import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Column,
} from 'typeorm';

@Entity('performance')
export class Performance {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => User,
        user => user.performance,
        { eager: true },
    )
    @JoinColumn({ name: 'janitor' })
    janitor: User;

    @Column({ type: 'int', default: 1 })
    tasks: number;

    @Column({ type: 'varchar', length: 7 })
    date: string;
}
