import {createStore} from 'redux'
import rootReducer from '../Reducers/ContactReducer'

const configureStore = (initialState) => {
  return createStore(rootReducer, initialState)
}
export default configureStore
