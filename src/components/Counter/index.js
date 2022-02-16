import React from 'react'
import {useSelector, useDispatch} from 'react-redux'

const Counter = () => {
  const dispatch = useDispatch()
  const counter = useSelector(state => state.value)
  const input = useSelector(state => state.input)
  console.log('input out', input)
  console.log('counter out', counter)

  const Increment = (e) => {
    if(input !== ''){
      return dispatch({type: 'Increment', payload: parseInt(input), input: ''})
    }

    return dispatch({type: 'Increment', payload: 1, input: ''})
  }

  const Decrement = (e) => {
    if(input !== ''){
      return dispatch({type: 'Decrement', payload: parseInt(input), input: ''})
    }

    return dispatch({type: 'Decrement', payload: 1, input: ''})
  }

  const onChange = (e) => {
    return dispatch({type: 'Input', payload: counter, input: e.target.value})
  }

  return (
    <div>
      <p>Current count: {counter}</p>
      <input
        placeholder="test"
        type="text"
        value={input}
        onChange={(e) => onChange(e)}
      />
      <button onClick={Increment}>+</button>
      <button onClick={Decrement}>-</button>
    </div>
  )
}
export default Counter
