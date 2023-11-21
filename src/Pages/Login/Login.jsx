import React, {useContext, useState} from 'react'
import "./Login.css"
import UserContext from "../../Components/Context/UserContext";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../customHooks/user';

export default function Login() {


    // const { userLogin, setUserLogin } = useContext(UserContext)
    const { userLogin, setUserLogin } = useUser()

    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        const tempBody = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        fetch("http://localhost:4000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tempBody)
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            Cookies.set('user', data.user.email)
            Cookies.set('token', data.accessToken)
            Cookies.set('id', data.user.id)
            setUserLogin({
                user: data.user.email,
                token: data.accessToken,
                id: data.user.id
            })
            navigate("/userpage")
        })
        .catch(err => console.error(err));
    }
    
    
    return (
        <div className='login'>
            <div className="topHero">
                <img src="/Hero1.png" alt="Hero Image" />
            </div>

            <div className="login__wrapper">
                <h1>Login</h1>

                <p>Indtast login oplysninger:</p>
                
                <form onSubmit={handleLogin}>
                    <input type="email" name="email" id="email" placeholder='Indtast din email' />
                    <input type="password" name="password" id="password" placeholder='Indtast adgangskode' />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}