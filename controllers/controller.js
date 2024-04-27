const asyncHandler = require('express-async-handler')
const { Categories, Transactions } = require('../models/model')

// used to just post the data to the DB, won't be changed later
const postCategories = asyncHandler(async (req, res) => {
  const dataForDB = {
    type: 'Expenses',
    color: 'rgb(255, 205, 86)',
  }

  try {
    const data = await Categories.create(dataForDB)
    if (data) {
      res.json(data)
    }
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

// used to get the categories from the DB, sent back to frontend
const getCategories = asyncHandler(async (req, res) => {
  try {
    const allCategories = await Categories.find({})
    if (allCategories) {
      res.json(allCategories)
    }
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

// used to post transactions

const createTransaction = asyncHandler(async (req, res) => {
  try {
    if (!req.body) return res.status(400).json('No data provided')
    const { name, type, amount } = req.body

    const data = await Transactions.create({
      name,
      type,
      amount,
      date: new Date(),
    })
    if (data) {
      res.json(data)
    }
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

// used to get all transactions
const getTransactions = asyncHandler(async (req, res) => {
  try {
    const allTransactions = await Transactions.find({})
    if (allTransactions) {
      res.json(allTransactions)
    }
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

// used to delete transaction by ID
const deleteTransactionById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params
    console.log(id)

    const data = await Transactions.findByIdAndDelete(id)

    if (data) {
      res.json(data)
      // call get api from frontend after deleting the transaction
    }
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

// now we want to join the Transactions Model and Categories Modal and retreive field like below:
const getLabels = asyncHandler(async (req, res) => {
  // lookup from one collection to merge into another collection
  Transactions.aggregate([
    {
      $lookup: {
        from: 'Categories',
        localField: 'type',
        foreignField: 'type',
        as: 'Categories_info',
      },
    },
    {
      $unwind: '$Categories_info',
    },
  ])
    .then(result => {
      res.json(result)
      console.log('try block works')
    })
    .catch(err => res.status(400).json('lookup failed'))
})

module.exports = {
  postCategories,
  getCategories,
  createTransaction,
  getTransactions,
  deleteTransactionById,
  getLabels,
}
