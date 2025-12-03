/**
 * Сущность одной заметки Note
 * Контроллер заметок Notes
 * UI - NotesUI
 */

/**
 * @typedef NoteProps
 * @property {string} title
 * @property {string} content 
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
    constructor({ title, content }) {
        if (!title.length && !content.length) return
        // this.title = title || ''
        // this.content = content || ''
        /** @type {NoteItem} */
        this.note = {
            id: crypto.randomUUID(),
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

    /**
     * 
     * @param {NoteProps} param
     */
    createNote({ title, content }) {
        if (!title.length && !content.length) return
        const note = new Note({ title, content })
        this.notes.push(note)
    }

    /**
     * редактирование заметки из списка заметок
     * @param {string} id 
     * @param {NoteProps} newValue 
     */
    edit(id, newValue) {
        /** @type {Note} экземпляр класс */
        const note = this.notes.noteById[id]
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
}

const notes = new Notes()
console.log(notes)
