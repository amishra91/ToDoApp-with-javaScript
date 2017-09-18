var data = (localStorage.getItem('toDoList')) ? JSON.parse(localStorage.getItem('toDoList')): {
  todo : [],
  completed: []
};

var addTaskBtn = document.getElementById('add');
var userInput = document.getElementById('item');

var removeIcon = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
var addIcon = '<i class="fa fa-check-circle-o" aria-hidden="true"></i>';

userInput.focus();
renderTodoList();

function renderTodoList() {
  if(!data.todo.length && !data.completed.length) return;

  for(var i = 0; i < data.todo.length; i++) {
    var value = data.todo[i];
    addItemTodo(value);
  }

  for(var j = 0; j < data.completed.length; j++) {
    var value = data.completed[j];
    addItemTodo(value, true);
  }
}

function dataObjectUpdated() {
  localStorage.setItem('toDoList', JSON.stringify(data));
}

 function addButtonClick() {
   addTaskBtn.addEventListener('click', function() {
    var value = userInput.value;
    if (value) {
      addItemTodo(value);
      data.todo.push(value);
      dataObjectUpdated();
    }
    userInput.value = '';
    userInput.focus();
  });
 }

 function removeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  if(id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
  } else {
    data.completed.splice(data.todo.indexOf(value), 1);
  }
  parent.removeChild(item);
  dataObjectUpdated();
 }

 function completeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  if(id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
    data.completed.push(value);
  } else {
    data.completed.splice(data.todo.indexOf(value), 1);
    data.todo.push(value);
  }
  dataObjectUpdated();

  var target = (id === 'todo') ? document.getElementById('complete') : document.getElementById('todo');

  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
 }

function addItemTodo(text, completed) {
  var list = (completed) ? document.getElementById('complete') : document.getElementById('todo');

  var item = document.createElement('li');
  item.classList.add('to-do-list-item');
  item.innerText = text;

  var buttons = document.createElement('div');
  buttons.classList.add('btns');

  var remove = document.createElement('button');
  remove.classList.add('dlt-btn');
  remove.innerHTML = removeIcon;

  // Click event on remove button
  remove.addEventListener('click', removeItem);

  var complete = document.createElement('button');
  complete.classList.add('cmplt-btn');
  complete.innerHTML = addIcon;

  // Click event on complete button
  complete.addEventListener('click', completeItem);

  buttons.appendChild(remove);
  buttons.appendChild(complete);
  item.appendChild(buttons);

  list.insertBefore(item, list.childNodes[0]);
}
addButtonClick();