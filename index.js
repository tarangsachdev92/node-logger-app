const express = require('express');
var cors = require('cors');
const app = express();
const port = 3001;
const fs = require('fs');
var bodyParser = require('body-parser');

app.use(cors());
// fs.writeFileSync('notes.txt', 'this file is created ny nodeJs!');
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.get('/logger', (req, res) => {
  fs.readFile('logger.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

app.post('/logger', (req, res) => {
  // console.log(req.body);
  const { category, action, label } = req.body;
  fs.readFile('logger.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      const obj = JSON.parse(data); //now it an object
      // console.log(label);
      obj.table.push({ category, action, label, createdAt: new Date() }); //add some data
      json = JSON.stringify(obj); //convert it back to json
      fs.writeFile('logger.json', json, 'utf8', () => {}); // write it back
      res.send('Ok');
    }
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
