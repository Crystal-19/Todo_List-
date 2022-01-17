import React, {Component} from 'react'
import {Icon} from 'semantic-ui-react'
import {v4} from 'uuid'

import './styles.scss'

class TodoInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      todoList: [],
      focusId: null,
    }

    this.unCompletedList = []
    this.completedList = []
    this.todoInputRef = React.createRef()
  }

  componentDidUpdate(preProps, prevState) {
      const { todoList, focusId } = this.state
      const {todoList: prevTodoList} = prevState

    if (todoList.length > 0 && prevTodoList.length < todoList.length && focusId !== null) {  
      const focusTodo = todoList.find(dt => dt.id === focusId)
      focusTodo.ref.current?.focus()
    }
  }

  onCreateTodo(e) {
    const { todoList } = this.state

    const todoInput = e.target.value
    this.setState({value: todoInput})

    if (todoInput !== '') {
      const newTodoItem = {
        id: v4(),
        value: e.target.value,
        ref: React.createRef(),
        unCompleted: true,
      }

      this.setState({todoList: [...todoList, newTodoItem]})
      this.setState({focusId: newTodoItem.id})
      this.setState({value: ''})
    }
  }

  onDeleteInputItem = (id) => {
    const { todoList } = this.state

    this.setState({todoList: todoList.filter(td => td.id !== id)})
  }

  onChangeTodoValue = (value, id) => {
    const { todoList } = this.state

    const todoUpdate = todoList.find(item => item.id === id)
    todoUpdate.value = value
    const newTodoList = [...todoList]
    this.setState({todoList: newTodoList})
  }
  
  onChangeTodoStatus = id => {
    const { todoList } = this.state

    const itemChecked = todoList.find(td => td.id === id)
    itemChecked.unCompleted = !itemChecked.unCompleted
    this.setState({todoList: [...todoList]})
  }

  onKeyDown = (e, index, unCompleted, id, value) => {
    const { todoList } = this.state

    const onEnter = () => {
      const lastIdUncompleted = this.unCompletedList[this.unCompletedList.length - 1].id
      if (lastIdUncompleted === id) {
        e.preventDefault()
        this.todoInputRef.current.focus()
      } else {
        const newInput = {
          id: v4(),
          value: '',
          ref: React.createRef(),
          unCompleted,
        }

        const indexItemEnter = todoList.findIndex(td => td.id === id)
        const updateTodoList = [...todoList]
        updateTodoList.splice(indexItemEnter + 1, 0, newInput)
        this.setState({todoList: updateTodoList, focusId: newInput.id})
      }
    }

    const onBackSpace = () => {
      if (index > 0) {
        const itemDelete = todoList.find(td => td.id === id)
        const isCompletedItem = this.completedList.some(
          td => td.id === itemDelete.id,
        )

        const arrToFind = isCompletedItem ? this.completedList : this.unCompletedList

        const itemFocus =
          arrToFind[arrToFind.findIndex(item => item.id === itemDelete.id) - 1]

        this.setState({todoList: todoList.filter(td => td.id !== id)})
        e.preventDefault()
        itemFocus.ref.current.focus()
      }
    }

    if (e.keyCode === 13) {
      return onEnter()
    }

    if (value === '' && e.keyCode === 8) {
      return onBackSpace()
    }
  }
  
  renderTodo = (list) => {
    return list.map((td, index) => (
      <div key={td.id} className="input-item-container">
        <div className="input-container">
          <input type="checkbox" onChange={() => this.onChangeTodoStatus(td.id)}/>
          <input
            className="input-item"
            value={td.value}
            onChange={e => this.onChangeTodoValue(e.target.value, td.id)}
            ref={td.ref}
            onKeyDown={e =>
                this.onKeyDown(e, index, td.unCompleted, td.id, td.value)
              }
          />
        </div>
        <Icon onClick={() => this.onDeleteInputItem(td.id)} className="x icon" />
      </div>
    ))
  }

  render() {
    const { todoList } = this.state

    this.unCompletedList =  todoList.filter(td => td.unCompleted)
    this.completedList = todoList.filter(td => !td.unCompleted)
    return (
      <div className="container">
        <div className="todo-container">
          <div className="header">Tiêu Đề</div>
          {this.renderTodo(this.unCompletedList)}
          <div className="form">
            <Icon name="add" />
            <input
              className="input"
              placeholder="Mục danh sách"
              onChange={e => this.onCreateTodo(e)}
              value={this.state.value}
              ref={this.todoInputRef}
            />
          </div>
          {this.renderTodo(this.completedList)}
        </div>
      </div>
    )
  }
}
export default TodoInput
