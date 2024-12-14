import React from 'react'
import UserContext from './userContext'

const UserContextProvider = ({children}) => {
// this is used to store the data 
    const [user,setUser] = React.useState(null);
  return (
    <UserContext.Provider value={{user,setUser}}>
      {
        children
      }
    </UserContext.Provider>
  )
}

export default UserContextProvider