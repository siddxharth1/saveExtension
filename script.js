const button = document.getElementById("submitButton")
const input = document.getElementById("textInput")
const dataHTML = document.getElementById('data');

//disable button if input is
button.disabled = true;
input.addEventListener("keyup", (e) => {
    if (e.target.value === '') {
        button.disabled = true;
    }
    else {
        button.disabled = false;
    }
})

//data of localStorage
let data = localStorage.getItem('todo-list-data') ? JSON.parse(localStorage.getItem('todo-list-data')) : [];
console.log(data)


//display local storage data in html
const displayItem = () => {
    let items = ''
    for (let i = 0; i < data.length; i++) {
        items += `<div class="item">
                            <div class="inputData">
                                <textarea class="textarea" disabled>${data[i]}</textarea>
                                <div class="editDlt">
                                    <button class="editBtn"> <i class="bi bi-pencil-square"></i></button>
                                    <button class="dltBtn"> <i class="bi bi-trash3"></i></button>
                                </div>
                            </div>
                            <div class="btns">
                                <button class="saveBtn"><i class="bi bi-check2"></i></button>
                                <button class="cancelBtn"><i class="bi bi-x"></i></button>
                            </div>
                        </div>`
    }
    console.log(items)
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