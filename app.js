const experss = require('express');
const path = require('path');
const open = require('open').default;
const endpoint = require('./script/endpoint.js');

const app = experss();

app.use(experss);
app.use(endpoint);


// xu ly cac thu muc tinh
app.use(experss.static(path.join(__dirname)));

// tra ve index.html
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  open('http://localhost:3000');
});