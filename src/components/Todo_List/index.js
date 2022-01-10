import React, {useState, useRef, useEffect} from 'react'

import {Icon} from 'semantic-ui-react'
import {v4} from 'uuid'

import './styles.scss'

const TodoList = () => {
  const [todoInput, setTodoInput] = useState('')
  const [todoList, setTodoList] = useState([])
  const [todoCompleted, setTodoCompleted] = useState([])
  const todoInputRef = useRef()

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

  const onEnterNewTodo = e => {
    if (e.keyCode === 13) {
      e.preventDefault()
      todoInputRef.current.focus()
    }
  }

  const onDeleteInputItem = id => {
    setTodoList(todoList.filter(td => td.id !== id))
  }

  const handleCheck = (value, id) => {
    setTodoCompleted(prev => [...prev, todoList.filter(td => td.id===id)])
    const tdCompleted = todoCompleted.find(item => item.id === id)
    tdCompleted.value = value
    setTodoList(todoList.filter(td => td.id !== id))
  }

  useEffect(() => {
    if (todoList.length > 0) {
      todoList[todoList.length - 1].ref.current.focus()
    }
  }, [todoList])

  console.log(todoList)

  return (
    <div className="container">
      <div className="todo-container">
        <header className="header">Tiêu Đề</header>
        {todoList.map(todo => (
          <div key={todo.id} className="input-item-container">
            <div className="input-container">
              <input 
              type="checkbox" 
              onChange={() => handleCheck(todo.value, todo.id)}
              />
              <input
                onChange={e => onChangeInputItems(e.target.value, todo.id)}
                value={todo.value}
                ref={todo.ref}
                onKeyDown={onEnterNewTodo}
                className="input-item"
              />
            </div>
            <Icon
              className="x icon"
              onClick={() => onDeleteInputItem(todo.id)}
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
            ref={todoInputRef}
          />
        </form>
        <div className='completed-item-container'>
          <header className='completed-title'> mục đã hoàn tất </header>
          {todoCompleted.map(td => (
            <div className='completed-container' key={td.id}>
              <input type='checkbox' />
              <input 
                className='todo-compeleted' 
                value={td.value} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default TodoList
