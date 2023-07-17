const express = require('express')
const server = express()
const { 
  pageLanding,
  pageStudy,
  pageGiveClasses,
  saveClasses 
} = require('./pages')

const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
  express: server,
  noCache: true,
})

const port = process.env.NODE_ENV === 'production' ? 80 : 5500

server
  .use(express.urlencoded({ extended: true }))
  .use(express.static('public'))
  .get('/', pageLanding)
  .get('/study', pageStudy)
  .get('/give-classes', pageGiveClasses)
  .post('/save-classes', saveClasses)
  .listen(port)
