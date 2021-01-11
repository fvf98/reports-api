import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

@Entity('report')
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 150 })
    title!: string;

    @Column({ type: 'int' })
    troubleType!: number;

    @Column({ type: 'varchar', length: 150 })
    location!: string;

    @Column({ type: 'text' })
    description!: string;

    @Column({ type: 'simple-array', nullable: true })
    images: string[];

    @Column({ nullable: true })
    asigned: number;

    @Column()
    author: number;

    @Column({ type: 'char', default: 'P' }) // 'P' is for pending
    status: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}
