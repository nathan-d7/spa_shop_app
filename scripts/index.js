/**
 * Сущность одной заметки Note
 * Контроллер заметок Notes
 * UI - NotesUI
 */

// import { NoteCreator as NotesUI } from './modules/NotesUI.js'

import * as Utils from './modules/utils.js'

// try {
//     new NotesUI()
// } catch (error) {
//     console.warn(error.message)
// } finally {
//     console.log('Что то произошло')
// }

console.log(Utils.getRandomUID())

const notesButton = document.querySelector('#notes')

notesButton.addEventListener('click', async () => {
    const module = await import('./modules/NotesUI.js')
    console.log(module)

    const NotesUI = module.NoteCreator
    try {
        new NotesUI()
    } catch (error) {
        console.warn(error.message)
    } finally {
        console.log('Что то произошло')
    }
})


const input = document.querySelector('#city')
const btn = document.querySelector('#btn')
const box = document.querySelector('#info')

/**
 * @typedef WheatherData
 * @property {{
 *  lon: number,
 *  lat: number
 * }} coord
 * @property {[{
 *  id: number,
 *  main: string,
 *  description: string,
 * icon: string
 * }]} weather 
 * @property {string} base
 * @property {{
 *  temp: number
 *  feels_like: number
 *  temp_min: number
 *  temp_max: number
 *  pressure: number
 *  humidity: number
 *  sea_level: number
 *  grnd_level: number
 * }} main
 * @property {number} visibility
 * @property {{
 *  speed: number
 *  deg: number
 *  gust: number
 * }} wind
 * @property {{
 *  all: number
 * }} clouds
 * @property {number} dt
 * @property {{
 *  country: string
 *  sunrise: number
 *  sunset: number
 * }} sys
 * @property {number} timezone
 * @property {number} id
 * @property {string} name
 * @property {number} cod
 */

const getData = async () => {
    const city = input.value

    try {
        const responce = await fetch(`http://localhost:3000/api/wheather?q=${city}&lang=ru&units=metric`)

        if (!responce.ok) {
            throw new Error(responce.statusText)
        }

        /** @type {WheatherData} */
        const data = await responce.json()

        console.log(data)

        box.innerHTML = `
            <h2>${data.name}</h2>
            <p>Температура - ${data.main.temp}</p>
            <p>Скорость ветра - ${data.wind.speed}</p>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
        `
    } catch (error) {
        console.log(error.message)
    }
}

btn.addEventListener('click', getData)

if (window.Worker) {

    const getInput = document.querySelector('#idData')
    const getBtn = document.querySelector('#getBtn')
    const dataContainer = document.querySelector('#data')


    const worker = new Worker('../worker/index.js')

    getBtn.addEventListener('click', () => {
        if (!getInput.value.trim().length) return
        worker.postMessage({
            body: {
                id: getInput.value
            }
        })
    })

    worker.onerror = function (e) {
        console.log(e)
    }

    worker.onmessage = function (e) {
        // console.log(e)

        const data = e.data

        // console.log(data)
        dataContainer.innerHTML = `
            <p>Id записи - ${data.id}</p>
            <h2>${data.title}</h2>
            <p>${data.body}</p>
        `
    }
}