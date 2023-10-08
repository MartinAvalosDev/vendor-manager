const { Account } = require("../models/accounts.model");
const { Agreement } = require("../models/agreement.model");
const { Submission } = require("../models/submissions.model");
const { percenError } = require("../utils/errors");
const { percenValidation, depositBalance } = require("../utils/utils");

const depositIntoBalance = async (req, res) => {
    const buyerId = req.params.accountId;
    const { deposit } = req.body
    const tenPercen = await percenValidation(buyerId)
    if (deposit > tenPercen) return res.status(400).send(`${percenError}, that amount is: ${tenPercen}`)
    await depositBalance(buyerId, deposit)

    res.status(200).send(`You have deposited U$D${deposit} into Buyer ID: "${buyerId}" account`)
}

module.exports = {
    depositIntoBalance
}
// const url = 'http://localhost:3001/submissions/unpaid'
// let submissionsToPay
// await fetch(url)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`ERROR: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(data => {
//         submissionsToPay = data
//     })
//     .catch(error => {
//         console.error('Error: ', error);
//     });