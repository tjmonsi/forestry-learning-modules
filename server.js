const express = require('express');
const formidable = require('formidable');
const path = require('path');
const app = express();

app.get('/event-editing', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/modules/learning-module/components/event-editing/index.js'));
});

app.post('/event-editing', function (req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req);

  form.on('fileBegin', function (name, file) {
    file.path = path.join(__dirname, '/uploads/', file.name);
  });

  form.on('file', function (name, file) {
    console.log('Uploaded ' + file.name);
  });

  res.sendFile(path.join(__dirname, '/src/modules/learning-module/components/event-editing/index.js'));
});

app.listen(8081, function () {
  console.log('sever starting at 8081');
});
