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

export default Note