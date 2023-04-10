import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  todos: Todo[] = [];

  getTodos() {
    return this.todos;
  }

  getTodoById(id: number) {
    const todo = this.todos.find((actualTodo) => actualTodo.id === id);
    if (todo) return todo;
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas`); //notion de filtre : declanchement des erreurs
  }

  addTodo(newTodo: AddTodoDto) {
    const { name, description } = newTodo;
    let id;
    if (this.todos.length) {
      id = this.todos[this.todos.length - 1].id + 1;
    } else {
      id = 1;
    }
    const todo: Todo = {
      id,
      name,
      description,
      createdAt: new Date(),
    };
    this.todos.push(todo);
    return todo;
  }

  updateTodo(id: number, newTodo: Partial<UpdateTodoDto>) {
    const todo = this.getTodoById(id);
    todo.description = newTodo.description
      ? newTodo.description
      : todo.description;
    todo.name = newTodo.name ? newTodo.name : todo.name;
    return todo;
  }

  deleteTodo(id: number) {
    const index = this.todos.findIndex((todo: Todo) => todo.id === id);
    if (index >= 0) this.todos.splice(index, 1);
    else {
      throw new NotFoundException('Le todo d id ${id} n existe pas !');
    }
    return {
      message: `Le todo d id ${id} a été supprimé `,
      count: 1,
    };
  }
}
