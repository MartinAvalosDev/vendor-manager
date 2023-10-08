const { Orm } = require("../lib/orm")
const { Account } = require("../models/accounts.model")
const { Agreement } = require("../models/agreement.model")

const getAgreementByAccount = async (req, res) => {
    let id = req.params.id
    let agreement = await Agreement.findOne({
        where:
            { id }
    })
    res.status(200).send(agreement)
}

const getAllAgreements = async (req, res) => {
    let agreements = await Agreement.findAll({
        where: {
            status: {
                [Orm.Op.not]: 'terminated'
            }
        }
    })
    res.status(200).send(agreements)
}

module.exports = {
    getAgreementByAccount,
    getAllAgreements
}