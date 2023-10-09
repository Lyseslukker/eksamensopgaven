import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import "./Userpage.css"
import UserContext from "../../Components/Context/UserContext";
import Cookies from 'js-cookie';
import Userall from '../../Components/Userall/Userall';
import Usercustom from '../../Components/Usercustom/Usercustom';


export default function Userpage() {

    const navigate = useNavigate()

    const [userAll, setUserAll] = useState(false);
    const [userCustom, setUserCustom] = useState(true);
    

    const { userLogin, setUserLogin } = useContext(UserContext)

    const allHandler = () => {
        setUserAll(true)
        setUserCustom(false)
    }

    const customHandler = () => {
        setUserAll(false)
        setUserCustom(true)
    }


    useEffect(() => {
        const token = Cookies.get('token')
        if (!token) {
            navigate("/login")
        }
    }, []);


    if (userAll) {
        return (
            <div className="userpage">
                <h1>Alle programmer</h1>

                <div className="userpage__buttons">
                    <button onClick={customHandler}>Mit Program</button>
                    <button onClick={allHandler}>Programmer</button>
                </div>
                <Userall />
            </div>
        )
    }

    if (userCustom) {
        return (
            <div className="userpage">
                <h1>Mit program</h1>

                <div className="userpage__buttons">
                    <button onClick={customHandler}>Mit Program</button>
                    <button onClick={allHandler}>Programmer</button>
                </div>
                <Usercustom />
            </div>
        )
    }
}