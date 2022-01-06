import React, {useState} from 'react'

const TodoList = () => {
  const [job, setJob] = useState('')
  const [jobs, setJobs] = useState(() => {
    const storageJobs =  JSON.parse(localStorage.getItem('abc'))
    return storageJobs ?? []
  })

  const addJob = () => {
    setJobs(prev => {
      const newJobs = [...prev, job]

      const jsonJobs = JSON.stringify(newJobs)

      console.log(jsonJobs)

      localStorage.setItem('abc', jsonJobs)

      return newJobs
    })
    setJob('')
  }

  return (
    <div style={{padding: 32}}>
      <input value={job} onChange={e => setJob(e.target.value)} />
      <button onClick={addJob}>add</button>
      {jobs.map((job, index) => (
        <div key={index}>
          <li>{job}</li>
        </div>
      ))}
    </div>
  )
}
export default TodoList
