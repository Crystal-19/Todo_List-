/* eslint-disable react/display-name */
import React, {useState, memo} from 'react'

import './styles.scss'

const Employee = memo(({fullName}) => {
  const [text, setText] = useState(fullName)

  const onChange = e => setText(e.target.value)

  console.log(`Employee ${fullName} rerender`)

  // console.log('Employee fullName props', fullName)
  // console.log('Employee fullName state', text)
  // console.log('==================================')

  return (
    <li className="employee">
      <input value={text} onChange={onChange} />
    </li>
  )
})

const ListKeyPage = () => {
  const [people, setPeople] = useState([
    {empId: 1, fullName: 'Trump'},
    {empId: 2, fullName: 'Ivanka'},
  ])

  const addPeople = () => {
    const items = [{empId: Date.now(), fullName: (Math.random() + 1).toString(36).substring(7)}, ...people]
    // const items = [...people, {empId: Date.now(), fullName: (Math.random() + 1).toString(36).substring(7)},]
    setPeople(items)
  }

  console.log('cha render', people)

  return (
    <>
    <ul className="list-container">
      {people.map((dt, index) => (
        <Employee key={dt.empId} fullName={dt.fullName} />
      ))}
    </ul>

    <button onClick={addPeople}>Add people</button>
    </>
  )
}
export default ListKeyPage
