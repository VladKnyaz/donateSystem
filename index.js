const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const qiwiPayment = require('./modules/qiwiPayment');
const mainPage = process.cwd() + '/public/index.html';

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(mainPage);
});

app.post('/qiwiPayment', qiwiPayment.createPaymentBill);
app.get('/successPay', qiwiPayment.successPay);

app.listen(80, () => {
    try {
        console.log('старт');
    } catch (e) {
        console.log(e);
    }
});
