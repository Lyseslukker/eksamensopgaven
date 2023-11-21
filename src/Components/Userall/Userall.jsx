import React, {useState, useEffect, useContext} from 'react'
import UserContext from "../../Components/Context/UserContext";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import CustomError from "../../Pages/Error/CustomError"
import CustomLoading from "../../Pages/Loading/CustomLoading"
import {RxPlus} from "react-icons/rx"
import "../../Pages/Userpage/Userpage"
import { useUser } from '../../customHooks/user'
import { fetchAllBands } from '../../customHooks/fetchProgram';

export default function Userall() {

    const navigate = useNavigate()

    // const { userLogin, setUserLogin } = useContext(UserContext)
    const { userLogin, setUserLogin } = useUser()

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [bands, setBands] = useState([]);

    const setup = async () => {
        const fetchedBands = await fetchAllBands()
        setBands(fetchedBands)
        setLoading(false)
    }


    const addToMyProgramHandler = (e) => {

        const temp = {
            userId: userLogin.id,
            band: e.currentTarget.dataset.id
        }

        // console.log(e.currentTarget.dataset.id)
        fetch("http://localhost:4000/my-program", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userLogin.token}`
            },
            body: JSON.stringify(temp)
        })
        .then(response => response.json())
        .then((data) => {
            alert("Band er nu tilføjet til dit program")
            console.log(data)
        })
    }

    
    useEffect(() => {
        if (!userLogin) {
            return
        }
        else {
            setup()
        }
    }, [userLogin]);
    
    const spaceBegone = (classname) => {
        return classname.split(' ').join('_')
    }
    
    if (error) {
        return <CustomError msg={error} />
    }

    if (loading) {
        return <CustomLoading />
    }
    
    console.log("All bands: ", bands)
    return (
        <div className='user'>

            {bands.map((day) => {
                return (
                    <div key={day[0].day} className={`user__${day[0].day}`}>
                        <h3>{day[0].day}</h3>
                        {day.map((band) => {
                            return (
                                <div key={band.id} className="card">
                                    <p className={`card__time ${spaceBegone(band.stage)}`}>{band.time}</p>
                                    <p className='card__name'>{band.name}</p>
                                    <div className="card__add" data-id={band.id} onClick={addToMyProgramHandler}><RxPlus /></div>
                                </div>
                            )
                        })}
                    </div>
                )
                
            })}
        </div>
    )
}
