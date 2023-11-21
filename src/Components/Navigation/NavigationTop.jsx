import React, {useContext, useState, useEffect} from 'react'
import "./NavigationTop.css"
import Footer from '../Footer/Footer'
import { Outlet, Link } from "react-router-dom"
import {FaSearch} from "react-icons/fa"
import UserContext from "../../Components/Context/UserContext";
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../customHooks/user'

export default function NavigationTop() {

    const navigate = useNavigate()
    // const { userLogin, setUserLogin } = useContext(UserContext)
    const {userLogin, setUserLogin} = useUser()
    const [showLogout, setShowLogout] = useState(false);

    const mouseEnter = () => {
        setShowLogout(true)
    }
    const mouseLeave = () => {
        setShowLogout(false)
    }

    const userLogout = () => {
        Cookies.remove('user')
        Cookies.remove('token')
        Cookies.remove('id')
        setUserLogin({
            id: false,
            user: false,
            token: false
        })
    }

    
    useEffect(() => {
        // window.addEventListener("resize", handleInnerWidth)
        // console.log(userLogin)
    }, [userLogin]);

    if (userLogin.token) {
        return (
            <div className='app'>
            <header className='topNav'>
                <div className="logo">
                    <img src="/Logo.png" alt="logo" />
                </div>
                <nav onMouseLeave={mouseLeave}>
                    <Link to="/">FORSIDE</Link>
                    <Link to="/events">EVENTS</Link>
                    <Link to="/camps">CAMPS</Link>
                    <Link to="/billetter">BILLETTER</Link>
                    <Link to="/praktisk">PRAKTISK INFO</Link>
                    <Link to="/userpage" onMouseEnter={mouseEnter}>MIT PROGRAM</Link>
                    {showLogout ? 
                        <Link onClick={userLogout} to="/" className="nav__logout">
                            Logud
                        </Link> : null}
                    <FaSearch />
                </nav>
            </header>

            <Outlet />

            <Footer />
        </div>
        )
        
    }

    if (!userLogin.token) {
        return (
            <div className='app'>
                <header className='topNav'>
                    <div className="logo">
                        <img src="/Logo.png" alt="logo" />
                    </div>
                    <nav>
                        <Link to="/">FORSIDE</Link>
                        <Link to="/events">EVENTS</Link>
                        <Link to="/camps">CAMPS</Link>
                        <Link to="/billetter">BILLETTER</Link>
                        <Link to="/praktisk">PRAKTISK INFO</Link>
                        <Link to="/login">LOGIN</Link>
                        <FaSearch />
                    </nav>
                </header>
    
                <Outlet />
    
                <Footer />
            </div>
        )
    }
    
}