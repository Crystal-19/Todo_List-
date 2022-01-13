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
  const [headerCompleted, setHeaderCompleted] = useState(false)
  const [numberCompleted, setNumberCompleted] = useState(0)
  const [focusId, setFocusId] = useState(null)
  const todoInputRef = useRef()

  const todoListLength = todoList.length
  // const preTodoListLength = usePrevious(todoListLength)

  const onCreateTodo = e => {
    if (e.keyCode === 13) {
      e.preventDefault()
    }

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

  const onEnterNewTodo = (e, index) => {
    const newTodoRef = React.createRef()
    if (e.keyCode === 13) {
      if (index === todoListLength - 1) {
        e.preventDefault()
        todoInputRef.current.focus()
      } else {
        const startArr = unCompletedList.slice(0, index + 1)
        const endArr = unCompletedList.slice(index + 1)
        const newInput = {
          id: v4(),
          value: '',
          ref: newTodoRef,
          unCompleted: true,
        }
        const updateTodoList = [...startArr, newInput, ...endArr]
        setTodoList(updateTodoList)

        setFocusId(newInput.id)
      }
    }
  }

  const onDeleteInputItem = id => {
    setTodoList(todoList.filter(td => td.id !== id))
  }

  const handleCheck = (id, unCompleted) => {
    const itemChecked = unCompletedList.find(td => td.id === id)
    itemChecked.unCompleted = !unCompleted
    setTodoList(prev => [...prev])

    setHeaderCompleted(true)
    setNumberCompleted(numberCompleted + 1)
  }

  const handleUncheck = (id, unCompleted) => {
    const itemUnchecked = completedList.find(td => td.id === id)
    itemUnchecked.unCompleted = unCompleted
    setTodoList(prev => [...prev])

    setNumberCompleted(numberCompleted - 1)
    if (numberCompleted === 1) {
      setHeaderCompleted(false)
    }
  }

  const completedList = todoList.filter(td => !td.unCompleted)
  const unCompletedList = todoList.filter(td => td.unCompleted)
  const unCompletedLength = unCompletedList.length
  const preUnCompletedLength = usePrevious(unCompletedLength)

  useEffect(() => {
    if (
      unCompletedLength > 0 &&
      unCompletedLength > preUnCompletedLength &&
      focusId !== null
    ) {
      const focusTodo = unCompletedList.find(dt => dt.id === focusId)
      focusTodo.ref.current?.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preUnCompletedLength, unCompletedLength, focusId])

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
          {completedList.map(td => (
            <div className="completed-container" key={td.id}>
              <input
                type="checkbox"
                checked="checked"
                className="input-checked"
                onChange={() => handleUncheck(td.id, td.unCompleted)}
              />
              <input className="todo-completed" value={td.value} />
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
