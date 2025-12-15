import Note from "./Note.js"

/**
 * @typedef NoteList
 * @property {NoteItem} note
 */


/**
 * @typedef ResponceData
 * @property {number} userId
 * @property {number} id
 * @property {string} title
 * @property {string} body
 */

export class Notes {
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
   * @param {import("./Note").NoteProps} param
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
   * @param {import("./Note").NoteProps} newValue 
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
      const responce = await fetch('https://jsonplaceholder.typicode.com/posts')

      if (!responce.ok) {
        throw new Error('Возникла ошибка')
      }

      /**
       * @type {ResponceData[]}
       */
      const data = await responce.json()
      if (!data) return

      data.forEach(item => {
        const note = new Note({
          title: item.title,
          content: item.body
        })
        this.notes.push(note)
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}

const notes = new Notes()
console.log(notes)