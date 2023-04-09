/* eslint-disable prettier/prettier */

import { Body, Controller, HttpStatus, Param, ParseIntPipe, Query } from "@nestjs/common";
import { Get, Post} from '@nestjs/common';
import { Delete, Put } from "@nestjs/common/decorators";
import { GetPaginatedTodoDto } from "./dto/get-paginated-todo.dto";
import { AddTodoDto } from "./dto/add-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { TodoService } from "./todo.service";
import { UpperAndFusionPipe } from "../pipes/upper-and-fusion/upper-and-fusion.pipe";


@Controller('todo')
export class TodoController {
    // Injection du TodoService
    constructor(private todoService: TodoService) {
    }

    @Get()
    getTodo(
      @Query() mesQueryParams: GetPaginatedTodoDto //mesQueryParams devient une instance de GetPaginatedTodoDto puisque transform:true
    ) {
        console.log(mesQueryParams instanceof GetPaginatedTodoDto);
        return this.todoService.getTodos();
    }

    @Get('/:id')
    getTodoById(
      @Param('id',new ParseIntPipe({
            errorHttpStatusCode: HttpStatus.NOT_FOUND
      } )) id
    ) {
        return this.todoService.getTodoById(id);// na7iw kal +
    }

    @Post()
    addTodo(@Body() newTodo: AddTodoDto) {
        return this.todoService.addTodo(newTodo);
    }

    @Put('/:id')
    modifierTodo(
      @Param('id') id, // il faut recuperer l'id du todo à modifier
      @Body() newTodo: Partial<UpdateTodoDto> //les modifications
    ) {
        return this.todoService.updateTodo(+id, newTodo);
    }

    @Delete('/:id')
    deleteTodo(
      @Param('id') id   // il faut recuperer l'id du todo à supprimer
    ) {
        return this.todoService.deleteTodo(+id);
    }

    @Post('pipe')
    addPipe(
      @Body(UpperAndFusionPipe) data
    ){
        return data;
    }

}

