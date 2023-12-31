const { Account } = require("../models/accounts.model")
const { Agreement } = require("../models/agreement.model")
const { Submission } = require("../models/submissions.model")
const { updateBuyer, updateSupplier, updateSubmissionPaid } = require("../utils/utils")

//all submissions
const getAllSubmissions = async (req, res) => {
    let submissions = await Submission.findAll({
        include: [{
            model: Agreement,
            as: "Agreement"
        }]
    })
    res.status(200).send(submissions)
}
//unpaid submissions with only active agreements
const getUnpaidSubmissions = async (req, res) => {
    let submissions = await Submission.findAll({
        include: [{
            model: Agreement,
            where: {
                status: "in_progress"
            }
        }],
        where: {
            paid: false,
        }
    })
    res.status(200).send(submissions)
}


const paySubmissionById = async (req, res) => {
    let id = req.params.submission_id
    let submission = await Submission.findOne({
        include: [{
            model: Agreement,
            as: 'Agreement'
        }],
        where:
            { id }
    })
    //find buyer and update with balance condition
    let buyer = await Account.findOne({
        where: {
            id: submission.Agreement.BuyerId
        }
    })
    if (buyer.balance >= submission.price) {
        await updateBuyer(buyer.id, buyer.balance, submission.price)
    } else { return res.status(400).send('Buyer balance is not enough to pay the submission') }
    //find supplier and update
    let supplier = await Account.findOne({
        where: {
            id: submission.Agreement.SupplierId
        }
    })
    if (supplier) await updateSupplier(supplier.id, supplier.balance, submission.price)

    //update paid status, now the submission is paid and is not going to appear in /submissions/unpaid anymore
    await updateSubmissionPaid(id)
    res.status(200).send(submission)
}


module.exports = {
    getAllSubmissions,
    getUnpaidSubmissions,
    paySubmissionById
}