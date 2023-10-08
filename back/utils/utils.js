const { Account } = require("../models/accounts.model")
const { Agreement } = require("../models/agreement.model")
const { Submission } = require("../models/submissions.model")

async function updateBuyer(userId, balance, price) {
    const newBalance = balance - price
    await Account.update({
        balance: newBalance
    }, {
        where: {
            id: userId
        }
    })
}
async function depositBalance(userId, deposit) {
    let buyer = await Account.findOne({
        where:
            { id: userId }
    })
    const newBalance = buyer.balance += deposit
    let updatedBalance = await Account.update({
        balance: newBalance
    }, {
        where: {
            id: userId
        }
    })
    console.log(buyer.balance, "updated Balance");

}
async function updateSupplier(userId, balance, price) {
    const newBalance = balance += price
    await Account.update({
        balance: newBalance
    }, {
        where: {
            id: userId
        }
    })
}

async function percenValidation(buyerId) {
    let submissions = await Submission.findAll({
        include: [{
            model: Agreement,
            where: {
                status: "in_progress",
                BuyerId: buyerId
            }
        }],
        where: {
            paid: false,
        }
    })
    const totalPrice = submissions.reduce((acumulator, submission) => {
        return acumulator + submission.price;
    }, 0);
    return totalPrice * 0.10
}

module.exports = {
    updateBuyer,
    updateSupplier,
    percenValidation,
    depositBalance
}
