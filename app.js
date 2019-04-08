const express = require('express')
const met = require('./met.js')

const app = express()

const port = process.env.PORT || 3000

app.get('/students/:id', function(req, res) {
  if(!req.params.id) {
    return res.send({
      error: 'Debes enviar un ID.'
    })
  } else if(req.params.id != 'A01281577' && req.params.id != 'a01281577') {
    return res.send({
      error: 'ID incorrecto.'
    })
  }
  return res.send({
    id: "A01281577",
    fullname: "Oscar Guevara Valverde",
    nickname: "Carin",
    age: 22
  })
})

app.get('/students/*', function(req, res) {
  res.send({
    error: 'Debes enviar un ID.'
  })
})

app.get('/met', function(req, res) {
  if(!req.query.search) {
    return res.send({
      error: 'Tienes que dar algo a buscar.'
    })
  }
  met.metObjects(req.query.search, function(error, response) {
    if(error) {
      return res.send({
        error: error
      })
    }
    met.metObject(response.objectID, function(error, response) {
      if(error) {
        return res.send({
          error: error
        })
      }
      res.send({
        searchTerm: req.query.search,
        artist: response.artist,
        title: response.title,
        year: response.year,
        technique: response.technique,
        metUrl: response.metUrl
      })
    })
  })
})

app.get('*', function(req, res) {
  res.send({
    error: 'Esta ruta no existe.'
  })
})

app.listen(port, function() {
  console.log('Todo chido.')
})
