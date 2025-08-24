import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  firstName: string;

  @Column("varchar")
  lastName: string;

  @Column("varchar")
  email: string;

  // 다른 컬럼들도 타입 명시
  @Column("varchar", { nullable: true })
  phone?: string;

  @Column("text", { nullable: true })
  address?: string;
}
