const router = require('express').Router()
const {
  getCategories,
  postCategories,
  createTransaction,
  getTransactions,
  deleteTransactionById,
  getLabels,
} = require('../controllers/controller')

//creating the endpoints
router.route('/categories').get(getCategories).post(postCategories)
router.route('/transaction').post(createTransaction).get(getTransactions)
router.route('/transaction/:id').delete(deleteTransactionById)
router.route('/labels').get(getLabels)

module.exports = router
