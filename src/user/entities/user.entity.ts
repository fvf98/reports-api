import {
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  Entity,
  OneToOne,
} from 'typeorm';
import { hash } from 'bcryptjs';
import { Report } from 'src/report/entities';
import { Performance } from 'src/performance/entities/performance.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'last_name', type: 'varchar', length: 255, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  userName: string;

  @Column({ type: 'varchar', length: 128, nullable: false, select: false })
  password: string;

  @Column({ type: 'varchar', length: 15 })
  roles: string;

  @Column({ type: 'bool', default: true })
  status: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }

  @OneToOne(
    _ => Report,
    report => report.author,
    { cascade: true },
  )
  report: Report;

  @OneToOne(
    _ => Performance,
    performance => performance.janitor,
    { cascade: true },
  )
  performance: Performance;
}
