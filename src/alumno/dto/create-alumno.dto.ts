/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateAlumnoDto {
  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsOptional()
  telefono: number;

  @IsString()
  correo: string;

  @IsString()
  cedula: string;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  edad: number;

  @IsString()
  materias: string;
}
