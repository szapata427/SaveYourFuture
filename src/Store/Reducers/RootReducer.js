import {combineReducers } from 'redux'

import user from './User'
import transactions from './Transactions'

export default combineReducers({
    user,
    transactions
})