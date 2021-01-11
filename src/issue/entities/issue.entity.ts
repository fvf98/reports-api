import { Report } from 'src/report/entities';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne
} from 'typeorm';

@Entity('issue')
export class Issue {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 150 })
    title!: string;

    @OneToOne(
        _ => Report,
        report => report.issueType,
        { cascade: true },
    )
    report: Report;

}
