import React, {useState} from 'react'

import './styles.scss'

const TodoList = () => {
  const [todoInput, setTodoInput] = useState('')

  return (
    <div className="container">
      <div className="todo-container">
        <header> Tiêu Đề </header>
        <form>
          <i className="fa fa-plus">+</i>
          <input placeholder="Mục danh sách" />
        </form>
      </div>
    </div>
  )
}
export default TodoList
