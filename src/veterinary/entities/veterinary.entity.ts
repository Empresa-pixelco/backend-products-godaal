import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Branch } from '../../branch/entities/branch.entity';

@Entity()
export class Veterinary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Nombre de la veterinaria

  @Column()
  location: string; // Ubicación de la veterinaria

  @OneToMany(() => Branch, (branch) => branch.veterinary)
  branches: Branch[];
}
