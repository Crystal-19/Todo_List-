import React, {useState, useRef, useEffect} from 'react'

import {Icon} from 'semantic-ui-react'
import {v4} from 'uuid'

import './styles.scss'

const TodoList = () => {
  const [todoInput, setTodoInput] = useState('')
  const [todoList, setTodoList] = useState([])

  const onCreateTodo = e => {
    const todoInput = e.target.value
    setTodoInput(todoInput)

    if (todoInput.length === 1) {
      const newTodoRef = React.createRef()
      setTodoList(prev => [
        ...prev,
        {id: v4(), value: e.target.value, ref: newTodoRef},
      ])
      setTodoInput('')
    }
  }
  
  const onChangeInputItems = (value, id) => {
    const todoUpdate = todoList.find(item => item.id === id)
    todoUpdate.value = value
    const newTodoList = [...todoList]

    setTodoList(newTodoList)
  }

  useEffect(() => {
    if (todoList.length > 0) {
      todoList[todoList.length - 1].ref.current.focus()
    }
  }, [todoList])

  return (
    <div className="container">
      <div className="todo-container">
        <header className="header">Tiêu Đề</header>
        {todoList.map(todo => (
          <div key={todo.id}>
            <input
              onChange={e => onChangeInputItems(e.target.value, todo.id)}
              value={todo.value}
              // defaultValue={todo.value}
              ref={todo.ref}
            />
          </div>
        ))}
        <form className="form">
          <Icon name="add" />
          <input
            className="input"
            placeholder="Mục danh sách"
            onChange={onCreateTodo}
            value={todoInput}
          />
        </form>
      </div>
    </div>
  )
}
export default TodoList
