const ToDoList = (() => {
    class ToDoList {
        constructor(selector){
            this.container = document.querySelector(selector) || document.body
            this.tasks = JSON.parse(localStorage.getItem('to-do-list')) || []
            this.render()
        }

        saveTask(){
            localStorage.setItem('to-do-list', JSON.stringify(this.tasks))
        }

        addTask(text){
            const newTask = new Task(text)
            this.tasks = this.tasks.concat(newTask)
            this.showAll()
            this.render()
            this.saveTask()
        }    

        removeTask(index){
            this.tasks.splice(index, 1)
            this.render()
            this.saveTask()
        }

        toggleTask(element){
            if (element.isTaskCompleted === false) {
                element.isTaskCompleted = true
            } else if (element.isTaskCompleted === true) {
                element.isTaskCompleted = false
            }
            this.render()
            this.saveTask()
        }

        filterTasks(searchedItem){
            const searchedItemMod = searchedItem.toLowerCase().replace(/ /g,'')
            this.tasks.filter(element => {
                if (element.text.toLowerCase().replace(/ /g,'').includes(searchedItemMod)){
                    element.isTaskShowed = true
                } else {
                    element.isTaskShowed = false
                }
            })
            this.render()
        }

        showAll(){
            this.tasks.forEach(element => element.isTaskShowed = true)
            this.render()
        }

        showCompleted(){
            this.tasks.filter(element => {
                if (element.isTaskCompleted){
                    element.isTaskShowed = true
                } else {
                    element.isTaskShowed = false
                }
            })
            this.render()
        }

        showUncompleted(){
            this.tasks.filter(element => {
                if (element.isTaskCompleted){
                    element.isTaskShowed = false
                } else {
                    element.isTaskShowed = true
                }
            })
            this.render()
        }

        render(){
            this.container.innerHTML =''

            const header = document.createElement('h1')
            header.className = 'header'
            header.innerText = 'To Do List'
            this.container.appendChild(header)

            this.renderFrom()
            this.renderFilterInput()
            this.renderButtonShowAll()
            this.renderButtonShowCompleted()
            this.renderButtonShowUncompleted()
            this.renderTask()
        }

        renderFrom(){
            const input = document.createElement('input')
            const buttonAdd = document.createElement('button')
            const div = document.createElement('div')

            input.className = 'input input-form'
            buttonAdd.className = 'button button-add'
            div.className = 'form-container'

            input.setAttribute('placeholder', 'Add new task')
            buttonAdd.innerText = 'ADD'
            
            buttonAdd.addEventListener(
                'click',
                () => {
                    if (input.value) this.addTask(input.value)
                }
            )

            div.appendChild(input)
            div.appendChild(buttonAdd)
            this.container.appendChild(div)
        }

        renderFilterInput(){
            const input = document.createElement('input')
            const buttonSearch = document.createElement('button')
            const div = document.createElement('div')

            input.className = 'input input-filter'
            buttonSearch.className = 'button button-search'
            div.className = 'filter-container'

            input.setAttribute('placeholder', 'Find in your tasks')
            buttonSearch.innerText = 'SEARCH'
            
            buttonSearch.addEventListener(
                'click',
                () => this.filterTasks(input.value)
            )

            div.appendChild(input)
            div.appendChild(buttonSearch)
            this.container.appendChild(div)
        }

        renderButtonShowAll(){
            const buttonShowAll = document.createElement('button')
            buttonShowAll.className = 'button button-all'

            buttonShowAll.innerText = 'ALL'
            buttonShowAll.addEventListener(
                'click',
                () => this.showAll()
            )
            this.container.appendChild(buttonShowAll)
        }

        renderButtonShowCompleted(){
            const buttonShowCompleted = document.createElement('button')
            buttonShowCompleted.className = 'button button-completed'

            buttonShowCompleted.innerText = 'COMPLETED'
            buttonShowCompleted.addEventListener(
                'click',
                () => this.showCompleted()
            )
            this.container.appendChild(buttonShowCompleted)
        }

        renderButtonShowUncompleted(){
            const buttonShowUncompleted = document.createElement('button')
            buttonShowUncompleted.className = 'button button-uncompleted'

            buttonShowUncompleted.innerText = 'UNCOMPLETED'
            buttonShowUncompleted.addEventListener(
                'click',
                () => this.showUncompleted()
            )
            this.container.appendChild(buttonShowUncompleted)
        }

        renderTask(){
            this.tasks.forEach( (element, index) => {
                const div = document.createElement('div')
                const span = document.createElement('span')
                const buttonDelete = document.createElement('button')

                div.className = 'task-container'
                span.className = 'task'
                buttonDelete.className = 'button button-delete'

                span.innerText = `${index + 1}. ${element.text}`
                if (element.isTaskCompleted) span.style.textDecoration = 'line-through'
                buttonDelete.innerHTML = `<img src='delete.png' class='delete-img'>`

                buttonDelete.addEventListener(
                    'click',
                    () => this.removeTask(index) 
                )

                span.addEventListener(
                    'click',
                    () => this.toggleTask(element)
                )

                if (element.isTaskShowed) div.style.display = 'block'
                if (!element.isTaskShowed) div.style.display = 'none'

                this.container.appendChild(div)
                div.appendChild(buttonDelete)
                div.appendChild(span)
            })
        }
    }


    class Task {
        constructor(text){
            this.text = text,
            this.isTaskCompleted = false,
            this.isTaskShowed = true
        }
    }

    return ToDoList
}) ()
