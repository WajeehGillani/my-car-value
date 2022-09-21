import { Report } from 'src/reports/report.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  report: Report[];
 
  @AfterInsert()
  logInsert() {
    console.log('New user added with id: ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('New user updated with id: ', this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log('Removed User: ', this.id);
  }
}
