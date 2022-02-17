import React from 'react'
import ReactDOM from 'react-dom'

// import {createStore} from 'redux'
// import {Provider} from 'react-redux'

import App from './App'

// const initialState = {value: 0, input: ''}

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'Increment':
//       return {value: state.value + action.payload, input: action.input}
//     case 'Decrement':
//       return {value: state.value - action.payload, input: action.input}
//     case 'Input':
//       return {value: state.value, input: action.input}
//     default:
//       return state
//   }
// }

// const store = createStore(reducer)
// store.subscribe(() => {
//   console.log('current state', store.getState())
// })


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
