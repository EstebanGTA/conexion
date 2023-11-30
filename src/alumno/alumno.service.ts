import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alumno } from './entities/alumno.entity';
import { PaginacionDTO } from '../common/dto/paginacion.dto';

@Injectable()
export class AlumnoService {
  constructor(
    @InjectRepository(Alumno)
    private readonly producRepository: Repository<Alumno>,
  ) {}

  async create(createAlumnoDto: CreateAlumnoDto) {
    try {
      const alumnos = this.producRepository.create(createAlumnoDto);
      await this.producRepository.save(alumnos);
      return alumnos;
    } catch (error) {
      console.log(error);
      throw new Error('No se puede conectar');
    }
  }

  findAll(paginacionDTO: PaginacionDTO) {
    const { limit = 10, offset = 1 } = paginacionDTO;
    return this.producRepository.find({
      take: limit,
      skip: offset,
    });
    return this.producRepository.find({});
  }

  async findOne(id: number) {
    const alumnos = await this.producRepository.findOneBy({ id });

    if (!alumnos) throw new NotFoundException(id);
    return alumnos;
  }

  async update(id: number, updateAlumnoDto: UpdateAlumnoDto) {
    const alumnos = await this.producRepository.preload({
      id: id,
      ...updateAlumnoDto,
    });
    if (!alumnos) throw new NotFoundException('No se pudo eliminar');
    this.producRepository.save(alumnos);
    return alumnos;
  }

  async remove(id: number) {
    return this.producRepository.delete({ id });
  }
}
