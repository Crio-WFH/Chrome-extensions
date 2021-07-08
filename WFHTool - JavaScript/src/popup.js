$(document).ready(function () {
	// Input box selector to get input typed by user and also add enter click action
	//enter makes the item to save
	const todoInput = document.querySelector('.todo-input')
	// Unordered list selector to append the data to dom when enter is clicked
	const todoItemsList = document.querySelector('.todo-items')

	const griditem = document.querySelector('.grid-item-2')

	//array of todos
	//structure:
	//todos:[
	//{id:'todo-item',date:today's date(helps in filtering today's list, name:todolist name, completed:true/false}
	//{id:'todo-item',date:04072021,name:Schedule meeting,completed:false}
	//]
	const todos = []

	var eventt

	//first get the existing todo lists in the chrome storage sync

	renderTodos()

	document.addEventListener(
		'dragstart',
		function (event) {
			//get the dom object
			eventt = event.target

			event.dataTransfer.setData('text/plain', eventt)
		},
		false
	)
	document.addEventListener(
		'dragend',
		function (event) {
			renderTodos()
		},
		false
	)
	/* events fired on the drop targets */
	document.addEventListener(
		'dragover',
		function (event) {
			// prevent default to allow drop
			event.preventDefault()
			$('.emptyquadrant').empty()
		},
		false
	)

	document.addEventListener(
		'drop',
		function (event) {
			// prevent default action (open as link for some elements)
			event.preventDefault()
			// move dragged elem to the selected drop target

			if (event.target.className == 'grid-item-2') {
				var copy = eventt.cloneNode(true)
				var qid = event.target.id
				copy.type = 'quadrant-item' + qid

				var todo_name = copy.childNodes[4].previousSibling.textContent
				var todo_checked = copy.childNodes[5].checked

				var todo_date = copy.getAttribute('data-key')

				var todo

				getFromStorage(function (todos) {
					todo = {
						id: Date.now().toString(36) + Math.random().toString(36).substr(2),
						type: copy.type,
						date: todo_date,
						name: todo_name,
						completed: todo_checked,
					}
					todos.push(todo)

					saveToStorage(todos)
				})
			}
		},
		false
	)

	function renderTodos() {
		//on getting todo lists from chrome storage sync

		getFromStorage(function (todos) {
			//make the list view empty first
			$('.todo-items').empty()
			$('.emptyquadrant').empty()

			//for each todo in todo list

			todos.forEach(function (item) {
				const quadrant = document.querySelector('.' + item.type)

				//assign checked string if the item.completed value is true
				const checked = item.completed ? 'checked' : ''

				// construct a li element
				// <li> </li>
				const li = document.createElement('li')

				//<li class="item" data-key="1594003133171">
				//<span class="deleteitem"><i class="fa fa-trash"></i></span> Go to Gym
				//<input type="checkbox" class="checkbox" />
				//</li>
				li.setAttribute('id', item.type)
				li.setAttribute('class', 'item')
				li.setAttribute('data-key', item.date)
				li.setAttribute('data-id', item.id)
				li.setAttribute('draggable', true)
				if (item.completed === true) {
					li.classList.add('checked')
				}

				li.innerHTML = `
            <span class="deleteitem"><i class="fa fa-trash"></i></span>
            <p style="none !important">${item.name}</p>
            <input type="checkbox" class="checkbox" ${checked}> `

				// finally add the <li> to the <ul>
				if (item.type == 'todo-item') {
					todoItemsList.append(li)
				}

				if (item.type != 'todo-item') {
					try {
						quadrant.append(li)
					} catch {
						console.log('Ignore. Called from popup page')
					}
				}
			})
		})
	}

	//add click function on delete icon which is wrapped inside span
	$(document).on('click', '.deleteitem', function () {
		//get the object
		const that = this
		//get the index

		//populate todos from storage
		getFromStorage(function (todos) {
			//get element using index
			var itemhash = $(that).parent().get(0).getAttribute('data-id')

			todos.forEach(function (todo, i) {
				if (itemhash === todo.id) {
					//delete the item
					todos.splice(i, 1)
					//save back to storage
					saveToStorage(todos)
				}
			})
		})
	})

	//add click function on checkbox
	$(document).on('click', '.checkbox', function () {
		//get the dom object
		const that = this

		//populate todos from storage
		getFromStorage(function (todos) {
			//get data-id using of the object
			var itemhash = $(that).parent().get(0).getAttribute('data-id')

			todos.forEach(function (todo, i) {
				if (itemhash === todo.id) {
					//update the checked status
					todo.completed = !todo.completed
					//save back to storage
					saveToStorage(todos)
				}
			})
		})
	})

	//add key press listener on input field where todo list will be added
	$('.todo-input').keypress(function (event) {
		//13 for enter listen

		if (event.which === 13) {
			//get the text
			var todoText = $(this).val()
			// call addTodo function with input box current value
			addTodo(todoText)
			//chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			//chrome.tabs.update(tabs[0].id, { url: tabs[0].url })
			//})
		}
	})

	$(document).on('click', '.item', function (event) {
		if (event.target === this) {
			//get the dom object
			const that = this

			//populate todos from storage
			getFromStorage(function (todos) {
				//get data-id using of the object
				var itemhash = $(that).get(0).getAttribute('data-id')

				todos.forEach(function (todo, i) {
					if (itemhash === todo.id) {
						//update the checked status
						todo.completed = !todo.completed
						//save back to storage
						saveToStorage(todos)
					}
				})
			})
		}
	})

	function addTodo(item) {
		//if item is not empty
		if (item !== '') {
			//make a todo object with id,name,completed properities
			getFromStorage(function (todos) {
				const todo = {
					id: Date.now().toString(36) + Math.random().toString(36).substr(2),
					type: 'todo-item',
					date: new Date().toLocaleDateString(),
					name: item,
					completed: false,
				}

				todos.push(todo)

				saveToStorage(todos)
				//clear the content of input box
				todoInput.value = ''
			})
		}
	}
	//referred syntax from offical page
	function saveToStorage(todos) {
		chrome.storage.sync.set({ todos }, function () {
			renderTodos()
		})
	}

	function getFromStorage(callback) {
		chrome.storage.sync.get(['todos'], function (result) {
			if (result && result.todos) {
				callback(result.todos)
			} else {
				callback([])
			}
		})
	}
})
