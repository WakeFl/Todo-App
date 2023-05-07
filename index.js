const input = document.querySelector('.bud__text')
const btnAdd = document.querySelector('.bud__btn_add')
const btnEdit = document.querySelector('.bud__btn_edit')
const btnClear = document.querySelector('.bud__clear')
const listOfItem = document.querySelector('.bud__list')

btnAdd.addEventListener('click', () => {
    if (input.value.trim() === '') {
        return
    }
    addItem()
})

btnClear.addEventListener('click', () => {
    mainArr = []
    localStorage.clear()
    listOfItem.innerHTML = ''
})

listOfItem.addEventListener('click', e => {
    deleteItem(e)
    editItem(e)
})

const deleteItem = e => {
    let currLiRemove = e.target.dataset.remove
    for(i = 0 ; i < listOfItem.children.length ; i++) {
        if (currLiRemove == undefined) return;
        if(listOfItem.children[i].dataset.item == currLiRemove) {
            mainArr.splice(i,1)
            localStorage.setItem('data',JSON.stringify(mainArr))
            listOfItem.innerHTML = ''
            presentList()
        }
}}

let inputEdit;
let currLi;

const editItem = e => {
    currLi = e.target.dataset.edit
    for(i = 0 ; i < listOfItem.children.length ; i++) {
        if (currLi == undefined) return;
        if(listOfItem.children[i].dataset.item == currLi) {
           changeBtn(currLi)
        }
    }
}

const changeBtn = currLi => {
    let temp =  JSON.parse(localStorage.getItem(`data`))[currLi]
    mainArr[currLi] = inputTemplate
    localStorage.setItem(`data`, JSON.stringify(mainArr)) 
    listOfItem.innerHTML = ""
    presentList()
    inputEdit = document.querySelector('.bud__edit_input')
    inputEdit.value = temp
    const btn = document.querySelector(`.bud__edit[data-edit="${currLi}"]`);
    btn.style.display="none"
    const btnDone = document.querySelector(`.bud__edit_done[data-done="${currLi}"]`);
    btnDone.style.display="block"
    mainArr[currLi] = inputEdit.value
    localStorage.setItem(`data`,JSON.stringify(mainArr)) 
    changeBtnDone(btnDone,currLi,inputEdit)
}

const changeBtnDone = (btnDone,currLi,inputEdit) => {
    btnDone.addEventListener('click', () => {
        if (inputEdit.value.trim() == '') {
            mainArr.splice(currLi,1)
            localStorage.setItem('data',JSON.stringify(mainArr))
            listOfItem.innerHTML = ""
            presentList()
        } else {
            mainArr[currLi] = inputEdit.value
            localStorage.setItem(`data`,JSON.stringify(mainArr)) 
            listOfItem.innerHTML = ""
            presentList()
        }
    })
}


const presentList = () => {
    for (i = 0;i <= mainArr.length;i++) {
       if (mainArr[i] !== undefined) listOfItem.innerHTML += createTemplate(mainArr[i],i)
    }
}

const addItem = () => {
    mainArr.push(input.value)
    localStorage.setItem('data',JSON.stringify(mainArr))
    input.value = ''
    listOfItem.innerHTML = ''
    presentList()
}

const createTemplate = (value,index) => {
    return template = `
    <li class="bud__item" data-item="${index}">
    ${value}
        <div class="bud__buttons">
            <button class="bud__edit" data-edit="${index}"></button>
            <button class="bud__edit_done" data-done="${index}"></button>
            <button class="bud__remove" data-remove="${index}"></button>
        </div>
    </li>
    `
}

let mainArr = JSON.parse(localStorage.getItem('data')) ?? []

const inputTemplate = '<input type="text" class="bud__edit_input">'

presentList()