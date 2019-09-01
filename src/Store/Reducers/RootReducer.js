import {combineReducers } from 'redux'

import user from './User'
import currentTransactions from './Transactions'

export default combineReducers({
    user,
    currentTransactions
})