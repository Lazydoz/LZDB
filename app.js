const express = require('express');
const path = require('path');
const open = require('open').default;


const endpoint_base = require('./script/endpoint_base.js');

const app = express();

app.use(express.json());
app.use('/api/base',endpoint_base);


// xu ly cac thu muc tinh
app.use(express.static(path.join(__dirname)));

// tra ve index.html
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8000, () => {
  console.log('Server running on http://localhost:8000/');
  open('http://localhost:8000/');
});