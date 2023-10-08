const { Account } = require("../models/accounts.model")

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

module.exports = {
    updateBuyer,
    updateSupplier
}
