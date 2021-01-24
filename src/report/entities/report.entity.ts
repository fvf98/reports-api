import { Issue } from 'src/issue/entities';
import { User } from 'src/user/entities';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    BeforeUpdate,
} from 'typeorm';

@Entity('report')
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 150 })
    title!: string;

    @ManyToOne(
        () => Issue,
        issue => issue.report,
        { eager: true },
    )
    @JoinColumn({ name: 'issueType' })
    issueType!: Issue;

    @Column({ type: 'varchar', length: 150 })
    location!: string;

    @Column({ type: 'text' })
    description!: string;

    @Column({ type: 'simple-array', nullable: true })
    images: string[];

    @ManyToOne(
        () => User,
        user => user.report,
        { eager: true },
    )
    @JoinColumn({ name: 'asigned' })
    asigned: User;

    @ManyToOne(
        () => User,
        user => user.report,
        { eager: true },
    )
    @JoinColumn({ name: 'author' })
    author: User;

    @BeforeUpdate()
    async statusChange() {
        if (!this.asigned) {
            this.status = "P";
            return;
        }
        if (this.status != "T") this.status = "A";
    }

    @Column({ type: 'char', default: 'P' }) // 'P' is for pending
    status: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}
