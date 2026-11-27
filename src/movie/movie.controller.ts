import { Body, Controller, Get, Post } from '@nestjs/common';
import { MovieService } from './movie.service.js';
import { CreateMovieDto } from './dto/create-movie.dto.js';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Post()
  create(@Body() dto: CreateMovieDto) {
    return this.movieService.create(dto);
  }
}
