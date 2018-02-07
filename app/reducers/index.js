import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import system from './system'
const rootReducer = combineReducers({
    router,
    system
})

export default rootReducer
