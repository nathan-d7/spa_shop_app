import Note from './Note.js'
import { Notes } from './NotesAPI.js'

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

    /**
     * 
     * @param {SubmitEvent} e 
     */
    const handleSubmith = (e) => {
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
    }

    form.addEventListener('submit', handleSubmith)

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
    this.getData()
      .then(() => this.render())

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

const lol = 'Неизвестная строка'

export default lol

export {
  NotesUI as NoteCreator
}