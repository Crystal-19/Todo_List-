import {React, useContext} from 'react'

import {UserAvatarContext} from 'components/TestContext/UserDetail/UserDetail'

const Avatar = () => {
  const {avatar, setAvatar} = useContext(UserAvatarContext)
  return (
    <div onClick={setAvatar}>
      <img className="avatar" src={avatar} alt="" />
    </div>
  )
}
export default Avatar
