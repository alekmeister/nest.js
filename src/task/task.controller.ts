import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Headers,
  Req,
  Res,
} from '@nestjs/common';
import { TaskService } from './task.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import type { Request, Response } from 'express';

@Controller({
  path: 'task',
  // host: ['localhost'],
})
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('all')
  findAll() {
    return this.taskService.findAll();
  }

  @Get('by-id/:id')
  findById(@Param('id') id: string) {
    return this.taskService.findById(Number(id));
  }

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.taskService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.taskService.update(Number(id), dto);
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() dto: Partial<UpdateTaskDto>) {
    return this.taskService.patch(Number(id), dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.taskService.delete(Number(id));
  }

  @Get('query')
  checkQuery(@Query() query: any) {
    return `Query параметры ${JSON.stringify(query)}`;
  }

  @Get('headers')
  getHeaders(@Headers() headers: any) {
    return headers;
  }

  @Get('user-agent')
  getUserAgent(@Headers('user-agent') userAgent: string) {
    return `User-Agent: ${userAgent}`;
  }

  // когда нету декоратора, чтобы что то вытащить из запроса
  @Get('request')
  getReq(@Req() req: Request) {
    return {
      // просто вернуть req нельзя т.к. там циклические ссылки, JSON.stringify, который использует nest не переваривает
      method: req.method,
      url: req.url,
      headers: req.headers,
      query: req.query,
    };
  }
  // когда надо изменить ответ
  @Get('response')
  getResp(@Res() resp: Response) {
    console.log(resp);
    resp.status(200).json({ message: 'hi' });
  }

  @Get('params/:param1/spaces/:param2')
  getParams(
    @Param('param1') param1: string,
    @Param('param2') param2: string,
  ) {
    return `Параметры - ${param1}, ${param2}`;
  }
}
