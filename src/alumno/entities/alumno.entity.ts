/* eslint-disable prettier/prettier */
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcryptjs';

@Entity({ name: 'yavirac' })
export class Alumno {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'character varying', length: 50, nullable: false })
  nombre: string;

  @Column({ type: 'character varying', length: 50, nullable: false })
  apellido: string;

  @Column({ type: 'integer', nullable: false })
  telefono: number;

  @Column({ type: 'character varying', nullable: false })
  correo: string;

  @Column({ type: 'character varying', nullable: false, unique: true })
  cedula: string;

  @Column('int', {default: 0,})
  edad: number;

  @Column('text', {unique: true,})
  materias: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashCedula() {
    if (!this.cedula) return;
    this.cedula = await hash(this.cedula, 10);
  }

}
