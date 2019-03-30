class toDoList {
    constructor(selector){
        this.container = document.querySelector(selector) || document.body
        this.tasks = []
        this.render()
    }

    addTask(text){
        const task = {
            text: text,
            isTaskCompleted: false
        }
        this.tasks = this.tasks.concat(task)
        this.render()
    }

    removeTask(index){
        this.tasks.splice(index, 1)
        this.render()
    }

    toggleTask(element){
        if (element.isTaskCompleted === false) {
            element.isTaskCompleted = true
        } else if (element.isTaskCompleted === true) {
            element.isTaskCompleted = false
        }
        this.render()
    }

    render(){
        this.container.innerHTML =''
        this.renderFrom()
        this.renderTask()
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

    renderTask(){
        this.tasks.forEach( (element, index) => {
            const div = document.createElement('div')
            const span = document.createElement('span')
            const buttonDelete = document.createElement('button')

            span.innerText = `${index + 1}. ${element.text}`
            if (element.isTaskCompleted) span.style.textDecoration = 'line-through'
            buttonDelete.innerText = 'DELETE'

            buttonDelete.addEventListener(
                'click',
                () => this.removeTask(index) 
            )

            span.addEventListener(
                'click',
                () => this.toggleTask(element, span)
            )

            this.container.appendChild(div)
            div.appendChild(span)
            div.appendChild(buttonDelete)
        })
    }
}