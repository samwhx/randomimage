// load library
const express = require('express')
const path = require('path')

// start express
const app = express()

// random image
function getImageName () {
var hash = new Object(); // or just {}
hash[1] = "deer.jpg";
hash[2] = "dog.jpg";
hash[3] = "elephant.jpg";
hash[4] = "giraffe.jpg";
hash[5] = "hamster.jpg";
hash[6] = "kitten.jpg";
hash[7] = "koala.jpg";
hash[8] = "panda.jpg";
hash[9] = "porcupine.jpg";
hash[10] = "rabbit.jpg";
hash[11] = "seal.jpg";
hash[12] = "tortise.jpg";
hash_hength = Object.keys(hash).length;
random_number =  Math.floor((Math.random() * hash_hength) + 1);
random_image_name = hash[random_number];
return random_image_name
}

// configure routes
// static folder for images

app.get('/image', (req, resp) => {

  image_name = getImageName()

  resp.status(200)
  resp.type('text/html')
  resp.send(`<img src="${image_name}">`)
})

app.get('/random-image', (req, resp) => {

  image_name = getImageName()

  var options = {
    root: __dirname + '/images/',
    dotfiles: 'allow',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = image_name;
  resp.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.info('Sent:', fileName);
    }
  });

})

app.use(express.static(path.join(__dirname, 'images')))

// listen to port
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 4000
app.listen(PORT, () => {
  console.info(`Application started on port ${PORT} at ${new Date()}`)
})