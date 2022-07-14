const utils = require('../services/dappTokenUtils');

const balanceOf = async function(req, res){
    var balance = await utils.balanceOf(req.params._id)
    console.log(balance)
    res.send({"balance" : balance})
}

const transfer = async function(req, res) {
    var receipt = await utils.transfer(req.body.from, req.body.to, req.body.amount);
    res.send(receipt);
}

const getEvents = async function(req, res) {
    var events = await utils.getEvents();
    res.send(events);
}

module.exports = {
    balanceOf,
    transfer,
    getEvents
};