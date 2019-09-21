import {combineReducers } from 'redux'

import user from './User'
import currentTransactions from './Transactions'
import goals from './GoalsReducer'

export default combineReducers({
    user,
    currentTransactions,
    goals
})