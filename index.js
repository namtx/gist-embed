const express = require('express')
const morgan = require('morgan')
const fetch = require('node-fetch')

const app = express()

app.use(morgan('tiny'))


const fetchGist = async (url) => {
  const res = await fetch(`${url}.js`)
  const text = await res.text()
  const regex = /document\.write\(\'(<div id=\\"gist\d+\\" class=\\"gist\\">.*)\'\)/gm
  let html = regex.exec(text)[1]
  // html = html.replace()
  html = html.replace(/\\"/g, '"')
  html = html.replace(/\\n/g, '')
  html = html.replace(/<\\\//g, '</')
  return html
}

// Routes
app.get('/', (req, res) => {
  const url = req.query.url
  console.log(url)
  fetchGist(url).then(text => res.send(text))
})

app.listen(3000)

