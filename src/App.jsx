import React, {useState, useEffect} from 'react'
import {Route, Routes} from "react-router-dom"
import './App.css'
import NavigationTop from './Components/Navigation/NavigationTop'
import Home from "./Pages/Home/Home"
import Billetter from "./Pages/Billetter/Billetter"
import Details from "./Pages/Details/Details"
import Events from "./Pages/Events/Events"
import Login from "./Pages/Login/Login"
import Userpage from "./Pages/Userpage/Userpage"
import CustomError from "./Pages/Error/CustomError"
import CustomLoading from "./Pages/Loading/CustomLoading"
import Camps from './Pages/Camps/Camps'
import Praktisk from './Pages/Praktisk/Praktisk'
import UserContext from './Components/Context/UserContext'
import Cookies from 'js-cookie'
import { UserProvider } from './customHooks/user'




function App() {

  // const [userLogin, setUserLogin] = useState({
  //     id: false,
  //     user: false,
  //     token: false
  // });


//   useEffect(() => {
//     const user = Cookies.get('user')
//     const token = Cookies.get('token')
//     const id = Cookies.get('id')
//     // If the cookies exist
//     // Set update them with the userContext
//     if (token && user && id) {
//         setUserLogin({
//             user: user,
//             token: token,
//             id: id
//         })
//     }
//     else {
//         setUserLogin({
//           user: false,
//           token: false,
//           id: false
//         })
//     }
// }, []);


  return (
    <>
      {/* <UserContext.Provider value={{userLogin, setUserLogin}}> */}
      <UserProvider>
        <Routes>
            <Route path="/" element={<NavigationTop />}>
                <Route index element={<Home />} />
                <Route path="billetter" element={<Billetter />} />
                <Route path="details/:id" element={<Details />} />
                <Route path="events" element={<Events />} />
                <Route path="login" element={<Login />} />
                <Route path="userpage" element={<Userpage />} />
                <Route path="camps" element={<Camps />} />
                <Route path="praktisk" element={<Praktisk />} />
                <Route path="error" element={<CustomError />} />
                <Route path="loading" element={<CustomLoading />} />
            </Route>
        </Routes>
      </UserProvider>
      {/* </UserContext.Provider> */}
    </>
  )
}

export default App
