/* eslint-disable no-empty */
import React, {useState} from 'react'

const Fetch = () => {
  const [categories, setCategories] = useState([])

  const handleFetch = async () => {
    try {
      const url = 'https://chotot.herokuapp.com/api/v1/categories'
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      setCategories(data)
    } catch(error) {
      console.log(error)
    }

  }

  console.log('categories', categories)

  return (
    <div style={{margin: '50px'}}>
      <h1>Ella</h1>
      <button onClick={handleFetch}>fetch</button>
      {categories.map(cate => (
        <div key={cate._id}>
          <img src={cate.imageUrl} alt='' />
          <p>{cate.name}</p>
        </div>
      ))}
    </div>
  )
}
export default Fetch
