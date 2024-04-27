const mongoose = require('mongoose')
const Schema = mongoose.Schema

// categories model => ["type", "color"]
const categoriesModel = new Schema({
  type: { type: String },
  color: { type: String },
})

// transactions model => ["name", "type", "amount", "date"]
const transactionsModel = new Schema({
  name: { type: String },
  type: { type: String },
  amount: { type: Number }, 
  date: { type: Date },
})

const Categories = mongoose.model('categories', categoriesModel)
const Transactions = mongoose.model('transactions', transactionsModel)

module.exports = {
  Categories,
  Transactions,
}
