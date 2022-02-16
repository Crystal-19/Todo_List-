import React, {useState, createContext} from 'react'

import ProductList from './ProductList'
import UserActivity from './UserActivity/UserActivity'

import './styles.scss'

export const UserAvatarContext = createContext()

const UserDetail = () => {
  const [user, setUser] = useState({
    name: 'Ella',
    avatar: 'https://avatars.githubusercontent.com/u/50832371?v=4',
  })

  const setAvatar = () => {
    setUser({
      ...user,
      avatar:
        'https://traichomeo.com/wp-content/uploads/2022/01/meo-anh-long-ngan-mau-trang.jpg',
    })
  }

  return (
    <UserAvatarContext.Provider value={{avatar: user.avatar, setAvatar}}>
      <div className="user-detail">
        <ProductList />
        <UserActivity />
      </div>
    </UserAvatarContext.Provider>
  )
}
export default UserDetail
