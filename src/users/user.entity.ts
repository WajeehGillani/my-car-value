import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

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
