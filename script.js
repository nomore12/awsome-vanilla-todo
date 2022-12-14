const form = document.querySelector('.todo-input__form');
const input = document.querySelector('.todo-input__text');
const todoList = document.querySelector('.todo-content__list');
const doneList = document.querySelector('.todo-complete__list');

form.addEventListener('submit', onTodoSubmit);

function onTodoSubmit(event) {
  event.preventDefault();
  if(input.value.trim() === '') {
    alert('할 일을 작성해주세요.');
    return;
  }
  const todoItem = createTodo(input.value);
  input.value = '';
  todoList.appendChild(todoItem);
}

function createTodo(text) {
  const todo = document.createElement('li');
  const span = document.createElement('span');
  const button = document.createElement('button');
  todo.classList = ['todo-item'];
  span.classList = ['todo-item__text'];
  button.classList = ['todo-item__button'];
  span.innerText = text;
  button.innerText = '완료!';
  todo.appendChild(span);
  todo.appendChild(button);
  button.addEventListener('click', completeTodo)
  return todo;
}

function completeTodo() {
  const parent = this.closest('li');
  const span = parent.firstChild;
  span.classList.add('complete');
  this.innerText = '되돌리기';
  this.addEventListener('click', redoTodo);
  doneList.appendChild(parent);
}

function redoTodo() {
  const parent = this.closest('li');
  const span = parent.firstChild;
  this.removeEventListener('click', completeTodo);
  span.classList = ['todo-item__text'];
  this.addEventListener('click', completeTodo);
  this.removeEventListener('click', redoTodo);
  this.innerText = '완료!';
  todoList.appendChild(parent);
}