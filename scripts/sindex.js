/**
 * Сущность одной заметки Note
 * Контроллер заметок Notes
 * UI - NotesUI
 */

/**
 * @typedef NoteProps
 * @property {string} title
 * @property {string} content
 * @property {string} id 
 */

/**
 * @typedef NoteItem
 * @property {string} title
 * @property {string} content 
 * @property {string} id
 */

class Note {
    /**
     * @param {NoteProps} param 
     */
    constructor({ title, content, id }) {
        if (!title.length && !content.length) return
        // this.title = title || ''
        // this.content = content || ''
        /** @type {NoteItem} */
        this.note = {
            id: id || crypto.randomUUID(),
            title: title || '',
            content: content || ''
        }
    }

    /**
     * редактирование текущей заметки
     * @param {NoteProps} newValue 
     */
    edit(newValue) {
        // this.item = newValue - не правильно
        // Object.assign(this.item, newValue) // - мутабельный
        this.note = { // иммутабельно
            ...this.note,
            ...newValue
        }
    }
}

const note = new Note({ title: '234234', content: '23423424' })
console.log(note)

/**
 * @typedef NoteList
 * @property {NoteItem} note
 */

class Notes {
    /** @type {Array<Note>} */
    notes = []

    // getId() {
    //     const id = Math.floor(Math.random() * 10000)
    //     if (this.notes.some(item => item.note.id === id)) {
    //         return this.getId()
    //     }
    //     return id
    // }

    /**
     * 
     * @param {NoteProps} param
     */
    createNote({ title, content }) {
        if (!title.length && !content.length) return
        const note = new Note({ title, content })
        // const id = this.getId()
        // note.edit({ id })
        this.notes.push(note)
    }

    /**
     * редактирование заметки из списка заметок
     * @param {string} id 
     * @param {NoteProps} newValue 
     */
    edit(id, newValue) {
        /** @type {Note} экземпляр класс */
        const note = this.noteById[id]
        if (!note) return
        note.edit(newValue)
    }

    remove(id) {
        /**
         * map
         * filter
         * reduce
         */
        // const buffer = []
        // for (let i = 0; i < this.notes.length; i++) {
        //     if (this.notes[i].note.id !== id) {
        //        buffer.push(this.notes[i]) 
        //     }
        // }
        // this.notes = buffer
        this.notes = this.notes.filter(item => item.note.id !== id)
    }

    get noteById() {
        return this.notes.reduce((acc, item) => {
            acc[item.note.id] = item
            return acc
        }, {})
    }

    get store() {
        const storeNotes = localStorage.getItem('notes')
        if (!storeNotes) return []

        // JSON
        const notes = JSON.parse(storeNotes)
        return notes
    }

    set store(notes) {
        const jsonNotes = JSON.stringify(notes)
        localStorage.setItem('notes', jsonNotes)
    }

    clearStore() {
        localStorage.removeItem('notes')
    }

    async getData() {
        try {
            // что то ваять
            // this.notes = [...data.map(item => ...), ...this.notes]
            // this.render()
        } catch (error) {

        }
    }
}

const notes = new Notes()
console.log(notes)

class NotesUI extends Notes {
    /** @type {HTMLDivElement | null} */
    rootElement = null
    /** @type {HTMLDivElement | null} */
    notesList = null

    constructor() {
        super()

        const root = document.querySelector('#root')
        if (!root) {
            throw new Error('Корневой элемент не найден')
        }

        this.rootElement = root
        this.init()
    }

    init() {
        const form = document.createElement('form')

        const titleText = document.createElement('input')
        titleText.setAttribute('name', 'title')
        titleText.setAttribute('type', 'text')

        const contentText = document.createElement('textarea')
        contentText.setAttribute('name', 'context')

        const buttonSend = document.createElement('button')
        buttonSend.setAttribute('type', 'submit')
        buttonSend.innerText = 'Добавить'

        form.append(titleText, contentText, buttonSend)

        // form.innerHTML = `
        //     <input type='text' name='title'/>

        // `

        form.addEventListener('submit', (e) => {
            e.preventDefault()
            /** @type {HTMLFormElement} */
            const target = e.target
            const formData = new FormData(target)
            this.createNote({
                content: formData.get('context'),
                title: formData.get('title')
            })
            titleText.value = ''
            contentText.value = ''
            console.log(this.notes)
            this.render()
            this.store = this.notes
        })

        const notesList = document.createElement('div')
        notesList.classList.add('notesList')
        this.notesList = notesList
        this.rootElement.append(form, notesList)

        /**
         * if (!this.getCookie('notes')) {
         *  this.clearStore()
         *  this.clearCookie('notes)
         *  return 
         * }
         */

        /** @type {Note[]} но у storeNotes не будет метода edit*/
        const storeNotes = this.store
        if (!storeNotes.length) return
        storeNotes.forEach(item => {
            const note = new Note(item.note)
            this.notes.push(note)
        })
        this.render()
    }

    render() {
        this.notesList.innerHTML = ''
        this.notes.forEach(item => {
            let flag = false // если false -> редактирование выключено, true -> редактирование включено
            const div = document.createElement('div')
            div.classList.add('noteItem')

            const title = document.createElement('h3')
            title.classList.add('noteTitle')
            title.innerText = item.note.title

            const content = document.createElement('p')
            content.classList.add('noteContent')
            content.innerText = item.note.content

            const buttons = document.createElement('div')
            buttons.classList.add('buttons')

            const remove = document.createElement('button')
            remove.classList.add('remove')
            remove.innerText = 'Удалить'

            const edit = document.createElement('button')
            edit.classList.add('edit')
            edit.innerText = 'Редактировать'

            edit.addEventListener('click', () => {
                if (flag) {
                    // flag === true
                    edit.innerText = 'Редактировать'
                    title.contentEditable = false
                    content.contentEditable = false
                    this.edit(
                        item.note.id,
                        {
                            content: content.innerText,
                            title: title.innerText
                        }
                    )
                    flag = !flag
                    this.store = this.notes
                    this.render()
                } else {
                    // flag === false
                    edit.innerText = 'Сохранить'
                    title.contentEditable = true
                    content.contentEditable = true
                    flag = !flag
                }
            })

            remove.addEventListener('click', () => {
                this.remove(item.note.id)
                this.render()
                this.store = this.notes
            })

            buttons.append(remove, edit)
            div.append(title, content, buttons)
            this.notesList.append(div)
        })
    }
}

try {
    new NotesUI()
} catch (error) {
    console.warn(error.message)
} finally {
    console.log('Что то произошло')
}

// Promises api

// const promise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve('Промис выполнен успешно'), 6000)
//     setTimeout(() => reject('Промис выполнен с ошибкой'), 4000)
// })

// console.log(promise)

// promise
//     .then(
//         (data) => console.log(data),
//         (error) => console.log(error)
//     )
//     .catch((error) => console.log(error))
//     .finally(() => console.log('Выполняется вне зависимости от результата'))

// const promise2 = new Promise((_, reject) => {
//     reject('Промис всегда откланен')
// })

// promise2
//     .catch(
//         (error) => console.log(error)
//     )

// function httpGet(url) {
//     return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest()
//         xhr.open('GET', url, true)

//         xhr.onload = function () {
//             if (this.status == 200) {
//                 resolve(this.response)
//             } else {
//                 const error = new Error(this.statusText)
//                 error.code = this.status
//                 reject(error)
//             }
//         }

//         xhr.onerror = function () {
//             reject(new Error('Ошибка сети'))
//         }

//         xhr.send()
//     })
// }

// const promise3 = Promise.resolve(window.location)

// promise3
//     .then(() => httpGet('https://jsonplaceholder.typicode.com/todos/'))
//     .then((responce) => console.log(JSON.parse(responce)))
//     .catch((error) => console.log(error))

// const promise4 = Promise.reject('Всегда откланенный промис')

// promise4
//     // .then((data) => console.log(data))
//     .catch((error) => console.log(error))

// Promise.all([]) //передается массив промисов, ожидает выполнения всех промисов, будет сразу откланен, не дожидаясь остальный, если хотя бы один из промисов выполнен с ошибкой
// Promise.race([]) //передается массив промисов, ожидает выполнение первого промиса
// Promise.allSettled([]) //передается массив промисов, ожидает выполнения ВСЕХ переданных промисов

// const promiseRes = Promise.resolve('Успешный')
// const promiseRej = Promise.reject('Ошибка')

// Promise
//     .allSettled([promiseRes, promiseRej, promiseRes])
//     .then((results) => {
//         results.forEach(result => console.log(result))
//     })

// Promise
//     .all([promiseRej, promiseRes])
//     .then((results) => {
//         console.log(results)

//         // results.forEach(result => console.log(result))
//     })
//     .catch((error) => console.log(error))

/** @type {HTMLDivElement} */
const anim = document.querySelector('#anim')

const animHandler = () => {
    anim.classList.toggle('active')
    anim.removeEventListener('click', animHandler)

    // new Promise(() => {
    anim.addEventListener('transitionend', () => {
        anim.addEventListener('click', animHandler)
    })
    // })
}

anim.addEventListener('click', animHandler)

// const responce = httpGet('autorizationUrl')

// responce
//     .then(responce => httpGet(`userUrl/${responce.userId}`))
//     .catch(error => console.log(error))
//     .then(responce => httpGet(`profileUrl/${responce.profileId}`))
//     .catch(error => console.log(error))
//     .then(responce => httpGet(`imagesUrl/${responce.imagesId}`))
//     .catch(error => console.log(error))
//     .then(responce => cobsole.log(responce))
//     .catch(error => console.log(error))
//     .finally()

// const responce = Promise.resolve('A')

// responce
//     .then(data => {
//         console.log(data)
//         return Promise.resolve('B')
//     })
//     .catch(error => console.log(error))
//     .then(data => {
//         console.log(data)
//         return Promise.reject('C')
//     })
//     .catch(error => console.log(error))
//     .then(data => {
//         console.log(data)
//         return Promise.resolve('D')
//     })
//     .catch(error => console.log(error))
//     .then(data => console.log(data))
//     .catch(error => console.log(error))
//     .finally()

const functionAsync = async () => {
    try {
        const a = await Promise.resolve('A')
        console.log(a)
        const b = await Promise.resolve('B')
        console.log(b)
        const c = await Promise.resolve('C')
        console.log(c)
        const d = await Promise.resolve('D')
        console.log(d)

        anim.innerText = a + b + c + d
    } catch (error) {
        console.log('error', error)
    }
}

const a = functionAsync()

console.log(a)

// a.then(result => console.log(result))

// fetch('https://jsonplaceholder.typicode.com/todos/')
//     .then(responce => responce.json())
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

const getData = async () => {
    try {
        const responce = await fetch('https://jsonplaceholder.typicode.com/todos/')
        // console.log(responce)
        if (!responce.ok) throw new Error(`Запрос не выполнен, статус ${responce.status}`)

        const data = await responce.json()
        anim.innerText = data[0].title
    } catch (error) {
        console.log(error.message)
        console.log('Выполнил действия на случай ошибки')
    }
}

getData()