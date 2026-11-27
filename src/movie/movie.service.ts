import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entitites/movie.entity.js';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto.js';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find({
      where: { isPublic: true },
      order: { createdAt: 'asc' },
    });
  }

  async create(dto: CreateMovieDto): Promise<MovieEntity> {
    const movie = this.movieRepository.create(dto);

    return await this.movieRepository.save(movie);
  }
}
