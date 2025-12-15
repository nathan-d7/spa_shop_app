// Comon JS modules

const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(express.json())
app.use(cors({
  exposedHeaders: '*'
}))

const apiKey = '8643e5fa4d67cb1ad3c160e1d6c66d90'

app.get('/api/wheather', async (req, resp) => {
  const { q, lang, units } = req.query

  try {
    const responce = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q,
        lang,
        units,
        appid: apiKey
      }
    })

    if (!responce.data) {
      resp.statusCode(404).send('Получен пустой ответ')
    }

    resp.send(JSON.stringify(responce.data))
  } catch (error) {
    resp.sendStatus(500).send(error.message)
  }
})

app.listen(3000, function () {
  console.log('Сервер запущен')
})