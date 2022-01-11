import React, {useState, useRef, useEffect} from 'react'

import {Icon} from 'semantic-ui-react'
import {v4} from 'uuid'

import './styles.scss'

const usePrevious = value => {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

const TodoList = () => {
  const [todoInput, setTodoInput] = useState('')
  const [todoList, setTodoList] = useState([])
  const [todoCompleted, setTodoCompleted] = useState([])
  const [headerCompleted, setHeaderCompleted] = useState(false)
  const [numberCompleted, setNumberCompleted] = useState(0)
  const todoInputRef = useRef()

  const todoListLength = todoList.length
  const preTodoListLength = usePrevious(todoListLength)

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
  const onEnterNewTodo = (e, index) => {
    const newTodoRef = React.createRef()
    if (e.keyCode === 13) {
      if (index === todoListLength - 1) {
        e.preventDefault()
        todoInputRef.current.focus()
      } else {
        const startArr = todoList.slice(0, index + 1)
        const endArr = todoList.slice(index + 1)
        const newInput = {id: v4(), value: '', ref: newTodoRef}
        const updateTodoList = [...startArr, newInput, ...endArr]
        setTodoList(updateTodoList)

        newInput.ref.current && newInput.ref.current.focus()
      }
    }
  }

  const onDeleteInputItem = id => {
    setTodoList(todoList.filter(td => td.id !== id))
  }

  const handleCheck = id => {
    const itemCompleted = todoList.find(td => td.id === id)
    setTodoCompleted(prev => [...prev, itemCompleted])

    setHeaderCompleted(true)
    setNumberCompleted(numberCompleted + 1)

    setTodoList(todoList.filter(td => td.id !== id))
  }

  const handleUncheck = id => {
    const itemUnchecked = todoCompleted.find(td => td.id === id)
    setTodoList(prev => [...prev, itemUnchecked])

    setNumberCompleted(numberCompleted - 1)

    if (numberCompleted === 1) {
      setHeaderCompleted(false)
    }

    setTodoCompleted(todoCompleted.filter(td => td.id !== id))
  }

  useEffect(() => {
    if (todoListLength > 0 && todoListLength > preTodoListLength) {
      todoList[todoListLength - 1].ref.current.focus()
    }
  }, [todoListLength, preTodoListLength])

  return (
    <div className="container">
      <div className="todo-container">
        <header className="header">Tiêu Đề</header>
        {todoList.map((todo, index) => (
          <div key={todo.id} className="input-item-container">
            <div className="input-container">
              <input type="checkbox" onChange={() => handleCheck(todo.id)} />
              <input
                onChange={e => onChangeInputItems(e.target.value, todo.id)}
                value={todo.value}
                ref={todo.ref}
                onKeyDown={e => onEnterNewTodo(e, index)}
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
        <div className="completed-item-container">
          <header className={headerCompleted ? 'header-show' : 'header-hide'}>
            {numberCompleted} mục đã hoàn tất
          </header>
          {todoCompleted.map(td => (
            <div className="completed-container" key={td.id}>
              <input
                type="checkbox"
                checked="checked"
                className="input-checked"
                onChange={() => handleUncheck(td.id)}
              />
              <input className="todo-completed" value={td.value} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default TodoList
