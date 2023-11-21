import React, {useEffect, useState, useContext, createContext} from "react"
import Cookies from "js-cookie"

// Create Context
const UserContext = createContext()

// Export Provider
export const UserProvider = ({children}) => {
    const [userLogin, setUserLogin] = useState(false)

    const user = Cookies.get('user')
    const token = Cookies.get('token')
    const id = Cookies.get('id')
    
    useEffect(() => {
        if (token && user && id) {
            setUserLogin({
                user: user,
                token: token,
                id: id
            })
        }
        else {
            setUserLogin({
              user: false,
              token: false,
              id: false
            })
        }
    }, [])

    return (
        <UserContext.Provider value={{userLogin, setUserLogin}}>
            {children}
        </UserContext.Provider>
    )
};

// Export useUser
export const useUser = () => {
    const context = useContext(UserContext)
    return context
}