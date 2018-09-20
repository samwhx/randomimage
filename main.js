// load library
const express = require('express')
const path = require('path')
const hbs = require('express-handlebars')
const asciify = require('asciify-image')

// multiple static resources arrays
const resources = ['public','public/images']

// other fixed resources
const imageFolderPath = path.join(__dirname, 'public', 'images');

// start express
const app = express()

//start handlebars
app.engine('hbs', hbs({ defaultLayout: 'index.html'}))
app.set('view engine', 'hbs')
app.set('views', 'views')

//fs.readdirSync to store all images names inside an array
const fs = require('fs');
imageFolderContentArray = [];
fs.readdirSync(imageFolderPath).forEach(fileName => {
  imageFolderContentArray.push(fileName)
})

// random image
function getRandomImageName () {
random_number =  Math.floor((Math.random() * imageFolderContentArray.length) + 1);
random_image_name = imageFolderContentArray[random_number];
return random_image_name
}

// configure routes
// static folder for images
app.get('/image', (req, resp) => {
  image_name = getRandomImageName()
  resp.status(200)
  resp.format ({
    'text/html': () => {
      // resp.render('folder/image', {image: image_name, layout: 'abc.html'})
      resp.render('image', {image: image_name})
    },
    'application/json': () => {
      resp.json ({ imageURL: `/${image_name}`})
    },
    'image/jpg' : () => {
      resp.sendfile(path.join(imageFolderPath, image_name))
    },
    'text/plain' : () => {
      const opt = {
          fit : 'box',
          width: 70,
          height: 70,
          color: true
      }
      asciify(path.join(imageFolderPath, image_name), opt, (err, ascii) => {
        if (err) {
          resp.status(400).send(JSON.stringify(err))
        }
        resp.send(ascii)
        console.info(ascii)
      })
    },
    'default' : () => {
      resp.status(406).send('Not Acceptable!').end()
    }
  })
})

//api //chaining resp
app.get('/random-image', (req, resp) => {
  image_name = getRandomImageName()
  resp.status(200)
  .type('image/jpg')
  .sendfile(path.join(imageFolderPath, image_name))
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