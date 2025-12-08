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
}
