import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'text', nullable: true })
  username?: string | null;

  @Column({ type: 'timestamp' })
  createdAt!: Date;

  @Column({ type: 'text', nullable: true })
  email?: string | null;

  @Column({ type: 'text', nullable: true })
  password?: string | null;

  constructor(partial: Partial<UsersEntity>) {
    Object.assign(this, partial);
    this.createdAt = new Date();
  }
}
