import React, { useState, useEffect, useRef } from 'react'

const TestHook = () => {
  // const ref = React.createRef()

  const [value, setValue] = useState('')
  console.log(value)
  const Ref = useRef(value)
  console.log(Ref)

  return (
    <div style={{ background: 'pink'}}>
      <form>
        <input
          onChange={e => setValue(e.target.value)}
          // ref={ref}
        />
        <div>value:{value}</div>
      </form>
    </div>
  )
}
export default TestHook
