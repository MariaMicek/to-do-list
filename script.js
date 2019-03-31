class toDoList {
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
        this.tasks = this.tasks.concat(newTask.task)
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
        this.renderFrom()
        this.renderFilterInput()
        this.renderTask()
        this.renderButtonShowAll()
        this.renderButtonShowCompleted()
        this.renderButtonShowUncompleted()
    }

    renderFrom(){
        const input = document.createElement('input')
        const buttonAdd = document.createElement('button')

        input.setAttribute('placeholder', 'Add new task')
        buttonAdd.innerText = 'ADD'
        
        buttonAdd.addEventListener(
            'click',
            () => {
                if (input.value) this.addTask(input.value)
            }
        )

        this.container.appendChild(input)
        this.container.appendChild(buttonAdd)
    }

    renderFilterInput(){
        const input = document.createElement('input')
        const buttonSearch = document.createElement('button')

        input.setAttribute('placeholder', 'Find your tasks')
        buttonSearch.innerText = 'SEARCH'
        
        buttonSearch.addEventListener(
            'click',
            () => {
                if (input.value) this.filterTasks(input.value)
            }
        )

        this.container.appendChild(input)
        this.container.appendChild(buttonSearch)
    }

    renderButtonShowAll(){
        const buttonShowAll = document.createElement('button')
        buttonShowAll.innerText = 'ALL'
        buttonShowAll.addEventListener(
            'click',
            () => this.showAll()
        )
        this.container.appendChild(buttonShowAll)
    }

    renderButtonShowCompleted(){
        const buttonShowCompleted = document.createElement('button')
        buttonShowCompleted.innerText = 'COMPLETED'
        buttonShowCompleted.addEventListener(
            'click',
            () => this.showCompleted()
        )
        this.container.appendChild(buttonShowCompleted)
    }

    renderButtonShowUncompleted(){
        const buttonShowUncompleted = document.createElement('button')
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

            div.className = 'task'
            span.innerText = `${index + 1}. ${element.text}`
            if (element.isTaskCompleted) span.style.textDecoration = 'line-through'
            buttonDelete.innerText = 'DELETE'

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
            div.appendChild(span)
            div.appendChild(buttonDelete)
        })
    }
}


class Task {
    constructor(text){
        this.task = {
            text: text,
            isTaskCompleted: false,
            isTaskShowed: true
        }
    }
}
