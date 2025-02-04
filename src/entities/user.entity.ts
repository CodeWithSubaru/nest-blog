import { BeforeInsert, Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { Exclude, instanceToPlain } from 'class-transformer';
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column()
  email: string;

  @Column({ name: 'username', unique: true })
  username: string;

  @Column('text', { nullable: true })
  image?: string;

  @Column('text', { nullable: true })
  bio?: string;

  //   prevent to send it to the client or it will hide on the client
  @Column({ default: null, nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attemptPass: string) {
    return await bcrypt.compare(attemptPass, this.password);
  }

  toJson() {
    return instanceToPlain(this);
  }
}
