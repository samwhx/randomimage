// load library
const express = require('express')
const path = require('path')

// multiple static resources
const resources = ['public']

// start express
const app = express()

//fs.readdirSync to store all images names inside an array
const fs = require('fs');
const imageFolder = path.join(__dirname, 'public', 'images');
imageFolderContentArray = [];
fs.readdirSync(imageFolder).forEach(fileName => {
  imageFolderContentArray.push(fileName)
})

// random image
function getImageName () {
random_number =  Math.floor((Math.random() * imageFolderContentArray.length) + 1);
random_image_name = imageFolderContentArray[random_number];
return random_image_name
}

// configure routes
// static folder for images
app.get('/image', (req, resp) => {

  image_name = getImageName()

  resp.status(200)
  resp.type('text/html')
  resp.send(`<img src="/images/${image_name}">`)
})

//api
app.get('/random-image', (req, resp) => {
  image_name = getImageName()
  resp.status(200)
  resp.type('image/jpg')
  resp.sendfile(path.join(__dirname, 'public', 'images', image_name))
})

//load multiple static resources
for (let res of resources) {
  console.info(`loading static resource: ${res}`);
  app.use(express.static(path.join(__dirname, res)));
}

// listen to port
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000
app.listen(PORT, () => {
  console.info(`Application started on port ${PORT} at ${new Date()}`)
})