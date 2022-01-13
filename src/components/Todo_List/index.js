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
  const [focusId, setFocusId] = useState(null)
  const todoInputRef = useRef()

  const todoListLength = todoList.length
  const preTodoListLength = usePrevious(todoListLength)

  useEffect(() => {
    if (
      todoListLength > 0 &&
      todoListLength > preTodoListLength &&
      focusId !== null
    ) {
      const focusTodo = todoList.find(dt => dt.id === focusId)
      focusTodo.ref.current?.focus()
      console.log('focusTodo', focusTodo)
      console.log('focusId', focusId)
    }
  }, [todoListLength, preTodoListLength, todoList, focusId])

  useEffect(() => {})

  const onCreateTodo = e => {
    const todoInput = e.target.value
    setTodoInput(todoInput)

    if (todoInput.length === 1) {
      const newTodoRef = React.createRef()
      const newTodoItem = {
        id: v4(),
        value: e.target.value,
        ref: newTodoRef,
        unCompleted: true,
      }
      setTodoList(prev => [...prev, newTodoItem])

      setFocusId(newTodoItem.id)

      setTodoInput('')
    }
  }

  const onChangeInputItems = (value, id) => {
    const todoUpdate = todoList.find(item => item.id === id)

    todoUpdate.value = value
    const newTodoList = [...todoList]

    setTodoList(newTodoList)
  }

  const onEnterNewTodo = (e, unCompleted, id, value) => {
    const newTodoRef = React.createRef()
    if (e.keyCode === 13) {
      const indexOfLastItem = unCompletedList[unCompletedList.length - 1].id
      if (indexOfLastItem === id) {
        e.preventDefault()
        todoInputRef.current.focus()
      } else {
        const newInput = {
          id: v4(),
          value: '',
          ref: newTodoRef,
          unCompleted: unCompleted,
        }
        const indexItemEnter = todoList.findIndex(td => td.id === id)

        todoList.splice(indexItemEnter + 1, 0, newInput)
        setTodoList(todoList)

        setFocusId(newInput.id)
      }
    }

    if (value === '') {
      const indexItemDelete = todoList.findIndex(td => td.id === id)
      const itemAbove = todoList[indexItemDelete - 1]
      setTodoList(todoList.filter(td => td.id !== id))

      e.preventDefault()
      itemAbove.ref.current.focus()
    }
  }

  const onDeleteInputItem = id => {
    setTodoList(todoList.filter(td => td.id !== id))
  }

  const handleCheck = (id, unCompleted) => {
    const itemChecked = todoList.find(td => td.id === id)
    itemChecked.unCompleted = !unCompleted
    setTodoList(prev => [...prev])
  }

  const preventDefault = e => {
    if (e.keyCode === 13) {
      e.preventDefault()
    }
  }

  const completedList = todoList.filter(td => !td.unCompleted)
  const unCompletedList = todoList.filter(td => td.unCompleted)
  const numberCompleted = completedList.length

  return (
    <div className="container">
      <div className="todo-container">
        <header className="header">Tiêu Đề</header>
        {unCompletedList.map((todo, index) => (
          <div key={todo.id} className="input-item-container">
            <div className="input-container">
              <input
                type="checkbox"
                onChange={() => handleCheck(todo.id, todo.unCompleted)}
              />
              <input
                onChange={e => onChangeInputItems(e.target.value, todo.id)}
                value={todo.value}
                ref={todo.ref}
                onKeyDown={e =>
                  onEnterNewTodo(e, todo.unCompleted, todo.id, todo.value)
                }
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
            onKeyDown={e => preventDefault(e)}
          />
        </form>
        <div className="completed-item-container">
          <header className={numberCompleted ? 'header-show' : 'header-hide'}>
            {numberCompleted} mục đã hoàn tất
          </header>
          {completedList.map((td, index) => (
            <div className="completed-container" key={td.id}>
              <input
                type="checkbox"
                checked="checked"
                className="input-checked"
                onChange={() => handleCheck(td.id, td.unCompleted)}
              />
              <input
                className="todo-completed"
                value={td.value}
                onKeyDown={e =>
                  onEnterNewTodo(e, td.unCompleted, td.id, td.value)
                }
                onChange={e => onChangeInputItems(e.target.value, td.id)}
                ref={td.ref}
              />
              <Icon
                className="x icon"
                onClick={() => onDeleteInputItem(td.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default TodoList
