import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Criando variáveis públicas
  public mode: string = 'list';
  public todos: Todo[] = [];
  public title: string = 'Tarefas';
  public form: FormGroup;

  // Método chamado toda vez que o componente inicia
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });  
    
    this.load();
  }

  add() {
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
  }

  clear() {
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if(index !== -1 ) {
      this.todos.splice(index, 1);
    }
  }

  markAsDone(todo: Todo){
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  // Salvando string como JSON
  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }

  // Transformando JSON em string
  load() {
    const data = localStorage.getItem('todos');
    if (data) {
        this.todos = JSON.parse(data);
      } else {
        this.todos = [];
      }
  }

  changeMode(mode: string) {
    this.mode = mode;
  }
}
