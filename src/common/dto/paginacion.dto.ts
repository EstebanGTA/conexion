/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class PaginacionDTO {
  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  offset?: number;
}
