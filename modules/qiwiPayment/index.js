const QiwiBillPaymentsAPI = require('@qiwi/bill-payments-node-js-sdk');
const SECRET_KEY =
    'eyJ2ZXJzaW9uIjoiUDJQIi***CIsInVzZXJfGM3MjUxMjQ3OTZjMGEyZGVkMjhiMjMzNDZiMzNjNTV0=';
const open = require('open');

const qiwiApi = new QiwiBillPaymentsAPI(SECRET_KEY);

class qiwiPaymentSystem {
    createPaymentBill(req, res) {
        const billId = '651';

        const fields = {
            amount: 1,
            currency: 'RUB',
            comment: 'test',
            expirationDateTime: qiwiApi.getLifetimeByDay(1), // до какого числа счёт будет доступен для оплаты
            email: 'example@mail.org',
            account: 'client4563',
            successUrl: `http://localhost/successPay?billId=${billId}`,
        };

        qiwiApi.createBill(billId, fields).then(async (data) => {
            res.redirect('back');
            await open(data.payUrl);
        });
    }

    successPay(req, res) {
        if (req.query.billId) {
            qiwiApi.getBillInfo(req.query.billId).then((data) => {
                console.log(data);
            });
        }
        res.redirect('/');
    }
}

module.exports = new qiwiPaymentSystem();
