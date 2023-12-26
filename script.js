const button = document.getElementById("submitButton")
const input = document.getElementById("textInput")
//disable button if input is
button.disabled = true;
input.addEventListener("keyup", (e) => {
    if (e.target.value === '') {
        button.disabled = true
    }
    else {
        button.disabled = false
    }
    if (e.key === 'Enter') {
        e.preventDefault()
        button.click()
        button.disabled = false
    }
})

//data of localStorage
let data = localStorage.getItem('todo-list-data') ? JSON.parse(localStorage.getItem('todo-list-data')) : [];
// console.log(data)


//display local storage data in html
const displayItem = () => {
    let items = ''
    for (let i = 0; i < data.length; i++) {
        items += `<div class="item" draggable="true">
                        <div class="dragItems">
                            <i class="bi bi-three-dots-vertical"></i>
                            <i class="bi bi-three-dots-vertical"></i>
                        </div>
                    
                            <div class="inputData">
                                <textarea class="textarea" disabled>${data[i]}</textarea>
                                <div class="editDlt">
                                    <button class="editBtn"> <img src="pencil-square.svg" class="bi-pencil-square" alt="save"></button>
                                    <button class="dltBtn"> <img src="trash3.svg" alt="save"></button>
                                </div>
                            </div>
                            <div class="btns">
                                <button class="saveBtn"> <img src="check2.svg" alt="save"></i></button>
                                <button class="cancelBtn"> <img src="x.svg" alt="save"></button>
                            </div>
                        </div>`
    }
    // console.log(items)

    document.getElementById('items').innerHTML = items
    
    activateDeleteEventlistner()
    aactivateEditEventlistner()
    activatecancelEventlistner()
    activateSaveEventlistner()
}
if (data.length > 0) {
    displayItem()
}
else {
    document.getElementById('items').innerHTML = "<p class='nthnToshw'>Nothing to show</p>"
}

function activateDeleteEventlistner() {
    const deleteBtn = document.querySelectorAll('.dltBtn')
    deleteBtn.forEach((deleteBtn, index) => {
        deleteBtn.addEventListener("click", () => {
            data.splice(index, 1)
            localStorage.setItem('todo-list-data', JSON.stringify(data))
            displayItem()
        })
    });
}

function aactivateEditEventlistner() {
    const editBtn = document.querySelectorAll('.editBtn')
    const btns = document.querySelectorAll('.btns')
    const textarea = document.querySelectorAll('.textarea')
    const editDlt = document.querySelectorAll('.editDlt')

    editBtn.forEach((editBtn, index) => {
        editBtn.addEventListener(("click"), () => {
            btns[index].style.display = 'flex'
            textarea[index].disabled = false
            editDlt[index].style.display = 'none'
        })
    })
}

function activatecancelEventlistner() {
    const cancelBtn = document.querySelectorAll('.cancelBtn')
    const btns = document.querySelectorAll('.btns')
    const textarea = document.querySelectorAll('.textarea')
    const editDlt = document.querySelectorAll('.editDlt')

    cancelBtn.forEach((cancelBtn, index) => {
        cancelBtn.addEventListener(("click"), () => {
            btns[index].style.display = 'none'
            textarea[index].disabled = true
            editDlt[index].style.display = 'flex'
        })
    })
}

function activateSaveEventlistner() {
    const saveBtn = document.querySelectorAll('.saveBtn')
    const textarea = document.querySelectorAll('.textarea')
    const btns = document.querySelectorAll('.btns')
    const editDlt = document.querySelectorAll('.editDlt')

    saveBtn.forEach((saveBtn, index) => {
        saveBtn.addEventListener(("click"), () => {
            data[index] = textarea[index].value
            localStorage.setItem("todo-list-data", JSON.stringify(data))
            btns[index].style.display = 'none'
            textarea[index].disabled = true
            editDlt[index].style.display = 'flex'
        })
    })
}

//save data to local storage
button.addEventListener("click", (e) => {
    e.preventDefault();
    data.unshift(input.value)
    localStorage.setItem('todo-list-data', JSON.stringify(data))
    displayItem()
    input.value = ''
})

//drag and drop
const draggables = document.querySelectorAll('.item')
draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        setTimeout(() => {
            draggable.classList.add('dragging')
        }, 0);

    })
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
})

const itemsList = document.getElementById('items')
itemsList.addEventListener('dragover', e => {
    const afterElement = getDragAfterElement(itemsList, e.clientY)

    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
        itemsList.appendChild(draggable)
    }
    else {
        itemsList.insertBefore(draggable, afterElement)
    }

    let newData = []
    const textarea = document.querySelectorAll('.textarea')
    for (let i = 0; i < textarea.length; i++) {
        newData.push(textarea[i].value)
    }
    data = newData
    localStorage.setItem('todo-list-data', JSON.stringify(data))
})

function getDragAfterElement(itemsList, y) {
    const draggableElements = [...itemsList.querySelectorAll('.item:not(.dragging)')]
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}