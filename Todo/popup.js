const ADD_TASK_BTN = document.querySelector('.add-btn')
const TODO_TASK_LIST = document.querySelector('.todo-list')
const TODO_LIST_ITEM = document.querySelector('.todo-list--item')
const TODO_INPUT = document.getElementById('todo-input')

let todolist = []

init()

function init() {
  TODO_INPUT.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
      addTodo(TODO_INPUT.value)
      TODO_INPUT.value = ''
    }
  })

  ADD_TASK_BTN.addEventListener('click', () => {
    addTodo(TODO_INPUT.value)
    TODO_INPUT.value = ''
  })

  initialUiHandler()
}

function addTodo(task) {
  if (task && todolist.length < 5) {
    storageHandler(task)
  } else {
    warningmessage()
  }
}

function warningmessage() {
  const warn = document.createElement('div')
  warn.setAttribute('class', 'warn')
  warn.innerHTML =
    'Please prioritize your tasks again and try to complete tasks in the list first.'
  TODO_TASK_LIST.insertBefore(warn, TODO_LIST_ITEM)
}

function storageHandler(task) {
  let Task = {
    todo: task,
    id: Date.now(),
  }
  todolist.push(Task)
  chrome.storage.sync.set({ task: Task, list: todolist }, () => {
    renderTask()
  })
}

function renderTask() {
  chrome.storage.sync.get(['task'], (result) => {
    creatorFunction(result.task.todo, result.task.id)
  })
}

function fetchList() {
  chrome.storage.sync.get(['list'], (result) => {
    if (result.list) {
      todolist.push(...result.list)
      renderList(result.list)
    }
  })
}

function renderList(list = []) {
  list.forEach((item) => creatorFunction(item.todo, item.id))
}

function initialUiHandler() {
  fetchList()
  renderList()
}

function creatorFunction(desc, id) {
  const NEW_TODO = document.createElement('li')
  const BTN_GROUP = document.createElement('div')
  const TODO_TEXT = document.createElement('span')
  const DELETE_BTN = document.createElement('button')
  const EDIT_BTN = document.createElement('button')

  EDIT_BTN.innerText = 'Edit'
  DELETE_BTN.innerText = `Delete`

  NEW_TODO.setAttribute('id', id)
  NEW_TODO.setAttribute('class', 'task-list')
  BTN_GROUP.setAttribute('class', 'btn-group')
  TODO_TEXT.setAttribute('class', 'todo-text')
  EDIT_BTN.setAttribute('class', 'btn edit-btn')
  DELETE_BTN.setAttribute('class', 'btn delete-btn')

  DELETE_BTN.addEventListener('click', () => {
    TODO_TASK_LIST.removeChild(NEW_TODO)
    removeTask(NEW_TODO.id)
  })

  EDIT_BTN.addEventListener('click', () => {
    editor(NEW_TODO.id)
  })

  TODO_TEXT.textContent = `${desc}`

  NEW_TODO.append(TODO_TEXT)
  TODO_TASK_LIST.append(NEW_TODO)
  BTN_GROUP.append(EDIT_BTN)
  BTN_GROUP.append(DELETE_BTN)
  NEW_TODO.append(BTN_GROUP)
}

function removeTask(id) {
  const remainingTasks = todolist.filter((task) => id !== `${task.id}`)
  chrome.storage.sync.set({ list: remainingTasks })
  window.location.reload()
}

function editTask(id, newTask) {
  const editedTaskList = todolist.map((task) => {
    if (id === `${task.id}` && newTask) {
      return { ...task, todo: newTask }
    }
    return task
  })
  chrome.storage.sync.set({ list: editedTaskList })
}

function editor(id) {
  let TODO_ELEM = document.getElementById(`${id}`)
  let data = TODO_ELEM.innerHTML.split('>')[1].replace('</span', '')
  let TODO_EDIT = document.createElement('textarea')
  let SAVE_BTN = document.createElement('button')

  SAVE_BTN.textContent = 'Save'
  TODO_EDIT.value = data
  TODO_ELEM.replaceChildren(TODO_EDIT, SAVE_BTN)
  SAVE_BTN.setAttribute('class', 'btn save-btn')
  TODO_EDIT.setAttribute('class', 'input-edit')
  TODO_EDIT.setAttribute('class', 'input-edit')
  SAVE_BTN.addEventListener('click', () => {
    let newTask = TODO_EDIT.value
    editTask(id, newTask)
    window.location.reload()
  })
}
