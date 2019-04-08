
const request = require('request')

const metObjects = function( objeto, callback ) {
  const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=' + objeto
  request({ url: url, json: true }, function(error, response) {
    if(error) {
      callback('Servicio no disponible.', undefined)
    } else if(response.body.total == 0) {
      callback('No se encontró un objeto relacionado.', undefined)
    } else {
      const data = response.body
      const info = {
        objectID: data.objectIDs[0]
      }
      callback(undefined, info)
    }
  })
}

const metObject = function( miObjeto, callback ) {
  const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + miObjeto
  request({ url: url, json: true }, function(error, response) {
    if(error) {
      callback('Servicio no disponible.', undefined)
    } else {
      const data = response.body
      const info = {
        artist : data.constituents[0].name,
        title: data.title,
        year: data.objectEndDate,
        technique: data.medium,
        metUrl: data.objectURL
      }
      callback(undefined, info)
    }
  })
}

module.exports = {
  metObjects: metObjects,
  metObject: metObject
}
