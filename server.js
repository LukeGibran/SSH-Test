const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getFullYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', text => {
  return text.toUpperCase();
});

app.set('view engines', 'hbs');

app.use((req, res, next) => {
  const date = new Date().toString();
  const log = `${date}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.log('Unable to append to the server.log');
    }
  });

  next();
});

// app.use((req, res, next) => {
//   res.render('maintanance.hbs', {
//     pageTitle: 'Site is under maintainance',
//     pageMessage: "We'll be right back"
//   });
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    pageText: 'This is the home page'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'This is the about page',
    pageText: 'This is some page text'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error 404 Not Found'
  });
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
