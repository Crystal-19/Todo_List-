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
  const [headerToggle, setHeaderToggle] = useState(true)
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
    }
  }, [todoListLength, preTodoListLength, todoList, focusId])

  const onCreateTodo = e => {
    const todoInput = e.target.value
    setTodoInput(todoInput)

    if (todoInput !== '') {
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

  const onChangeTodoValue = (value, id) => {
    const todoUpdate = todoList.find(item => item.id === id)

    todoUpdate.value = value
    const newTodoList = [...todoList]

    setTodoList(newTodoList)
  }

  const onKeyDown = (e, index, unCompleted, id, value) => {
    const onEnter = () => {
      const lastIdUncompleted = unCompletedList[unCompletedList.length - 1].id
      if (lastIdUncompleted === id) {
        e.preventDefault()
        todoInputRef.current.focus()
      } else {
        const newTodoRef = React.createRef()
        const newInput = {
          id: v4(),
          value: '',
          ref: newTodoRef,
          unCompleted,
        }

        const indexItemEnter = todoList.findIndex(td => td.id === id)

        todoList.splice(indexItemEnter + 1, 0, newInput)
        setTodoList(todoList)

        setFocusId(newInput.id)
      }
    }

    const onBackSpace = () => {
      if (index > 0) {
        const itemDelete = todoList.find(td => td.id === id)
        if (unCompletedList.includes(itemDelete)) {
          const itemFocus =
            unCompletedList[unCompletedList.indexOf(itemDelete) - 1]

          setTodoList(todoList.filter(td => td.id !== id))
          e.preventDefault()
          itemFocus.ref.current.focus()
        } else {
          const itemFocus = completedList[completedList.indexOf(itemDelete) - 1]

          setTodoList(todoList.filter(td => td.id !== id))
          e.preventDefault()
          itemFocus.ref.current.focus()
        }
      }
    }

    if (e.keyCode === 13) {
      return onEnter()
    }

    if (value === '' && e.keyCode === 8) {
      return onBackSpace()
    }
  }

  const onDeleteInputItem = id => {
    setTodoList(todoList.filter(td => td.id !== id))
  }

  const onChangeTodoStatus = id => {
    const itemChecked = todoList.find(td => td.id === id)
    itemChecked.unCompleted = !itemChecked.unCompleted
    setTodoList(prev => [...prev])
  }

  const onToggleCompletedHeader = () => {
    setHeaderToggle(!headerToggle)
  }
  
  const completedList = todoList.filter(td => !td.unCompleted)
  const unCompletedList = todoList.filter(td => td.unCompleted)
  const numberCompleted = completedList.length

  const RenderTodo = list => {
    return list.map((todo, index) => (
      <div key={todo.id} className="input-item-container">
        <div className="input-container">
          <input type="checkbox" onChange={() => onChangeTodoStatus(todo.id)} />
          <input
            onChange={e => onChangeTodoValue(e.target.value, todo.id)}
            value={todo.value}
            ref={todo.ref}
            onKeyDown={e =>
              onKeyDown(e, index, todo.unCompleted, todo.id, todo.value)
            }
            className="input-item"
          />
        </div>
        <Icon className="x icon" onClick={() => onDeleteInputItem(todo.id)} />
      </div>
    ))
  }

  return (
    <div className="container">
      <div className="todo-container">
        <div className="header">Tiêu Đề</div>
        {RenderTodo(unCompletedList)}
        <div className="form">
          <Icon name="add" />
          <input
            className="input"
            placeholder="Mục danh sách"
            onChange={onCreateTodo}
            value={todoInput}
            ref={todoInputRef}
          />
        </div>
        <div className="completed-item-container">
          <div className={numberCompleted ? 'header-show' : 'header-hide'}>
            <Icon
              onClick={onToggleCompletedHeader}
              className={headerToggle ? 'angle down' : 'angle right'}
            />
            {numberCompleted} mục đã hoàn tất
          </div>
          <div className={headerToggle ? 'completed-show' : 'completed-hide'}>
            {RenderTodo(completedList)}
          </div>
        </div>
      </div>
    </div>
  )
}
export default TodoList
