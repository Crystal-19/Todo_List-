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
    if (this.state.todoList.length > 0 && prevState.todoList.length < this.state.todoList.length && this.state.focusId !== null) {  
      const focusTodo = this.state.todoList.find(dt => dt.id === this.state.focusId)
      focusTodo.ref.current?.focus()
    }
  }

  onCreateTodo(e) {
    const todoInput = e.target.value
    this.setState({value: todoInput})

    if (todoInput !== '') {
      const newTodoItem = {
        id: v4(),
        value: e.target.value,
        ref: React.createRef(),
        unCompleted: true,
      }

      this.setState({todoList: [...this.state.todoList, newTodoItem]})
      this.setState({focusId: newTodoItem.id})
      this.setState({value: ''})
    }
  }

  onDeleteInputItem = (id) => {
    this.setState({todoList: this.state.todoList.filter(td => td.id !== id)})
  }

  onChangeTodoValue = (value, id) => {
    const todoUpdate = this.state.todoList.find(item => item.id === id)
    todoUpdate.value = value
    const newTodoList = [...this.state.todoList]
    this.setState({todoList: newTodoList})
  }
  
  onChangeTodoStatus = id => {
    const itemChecked = this.state.todoList.find(td => td.id === id)
    itemChecked.unCompleted = !itemChecked.unCompleted
    this.setState({todoList: [...this.state.todoList]})
  }

  onKeyDown = (e, index, unCompleted, id, value) => {

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

        const indexItemEnter = this.state.todoList.findIndex(td => td.id === id)

        this.state.todoList.splice(indexItemEnter + 1, 0, newInput)
        this.setState({todoList: this.state.todoList})
        this.setState({focusId: newInput.id})
      }
    }

    const onBackSpace = () => {
      if (index > 0) {
        const itemDelete = this.state.todoList.find(td => td.id === id)
        const isCompletedItem = this.completedList.some(
          td => td.id === itemDelete.id,
        )

        const arrToFind = isCompletedItem ? this.completedList : this.unCompletedList

        const itemFocus =
          arrToFind[arrToFind.findIndex(item => item.id === itemDelete.id) - 1]

        this.setState({todoList: this.state.todoList.filter(td => td.id !== id)})
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
    this.unCompletedList =  this.state.todoList.filter(td => td.unCompleted)
    this.completedList = this.state.todoList.filter(td => !td.unCompleted)
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
