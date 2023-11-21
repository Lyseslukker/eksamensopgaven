import React, {useState, useEffect, useContext} from 'react'
import UserContext from "../../Components/Context/UserContext";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import CustomError from "../../Pages/Error/CustomError"
import CustomLoading from "../../Pages/Loading/CustomLoading"
import {RxPlus} from "react-icons/rx"
import "../../Pages/Userpage/Userpage"
import { useUser } from '../../customHooks/user';

export default function Userall() {

    const navigate = useNavigate()

    // const { userLogin, setUserLogin } = useContext(UserContext)
    const { userLogin, setUserLogin } = useUser()

    const allBandsByDay = [
        `http://localhost:4000/bands?day=Onsdag`,
        `http://localhost:4000/bands?day=Torsdag`,
        `http://localhost:4000/bands?day=Fredag`,
        `http://localhost:4000/bands?day=Lørdag`
    ]

    const [allOnsdag, setAllOnsdag] = useState(false);
    const [allTorsdag, setAllTorsdag] = useState(false);
    const [allFredag, setAllFredag] = useState(false);
    const [allLørdag, setAllLørdag] = useState(false);

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);


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
        const user = Cookies.get('user')
        const token = Cookies.get('token')
        const id = Cookies.get('id')
        // console.log(userLogin)
        // If the cookies exist
        // Update them with the userContext
        if (token && user && id) {
            setUserLogin({
                user: user,
                token: token,
                id: id
            })
            
            Promise.all(
                allBandsByDay.map((url) => {
                    return fetch(url)
                })
            )
            .then((responses) => {
                return Promise.all(
                    responses.map((response) => {
                        return response.json()
                    })
                )
            })
            .then((datas) => {
                // console.log(datas)
                setAllOnsdag(datas[0])
                setAllTorsdag(datas[1])
                setAllFredag(datas[2])
                setAllLørdag(datas[3])
                setLoading(false)
            })
        }
        else {
            setUserLogin({
                user: false,
                token: false,
                id: false
            })
            navigate("/login")
        }

        
    }, []);
    
    const spaceBegone = (classname) => {
        return classname.split(' ').join('_')
    }
    
    if (error) {
        return <CustomError msg={error} />
    }

    if (loading) {
        return <CustomLoading />
    }
    
    
    return (
        <div className='user'>

            {allOnsdag ? 
                <div className='user__onsdag'>
                    <h3>Onsdag</h3>
                    {allOnsdag.map((band) => {
                        return (
                            <div key={band.id} className="card">
                                <p className={`card__time ${spaceBegone(band.stage)}`}>{band.time}</p>
                                <p className='card__name'>{band.name}</p>
                                <div className="card__add" data-id={band.id} onClick={addToMyProgramHandler}><RxPlus /></div>
                            </div>
                        )
                    })}
                </div> 
                : null}
            {allTorsdag ? 
                <div className='user__torsdag'>
                    <h3>Torsdag</h3>
                    {allTorsdag.map((band) => {
                        return (
                            <div key={band.id} className="card">
                                <p className={`card__time ${spaceBegone(band.stage)}`}>{band.time}</p>
                                <p className='card__name'>{band.name}</p>
                                <div className="card__add" data-id={band.id} onClick={addToMyProgramHandler}><RxPlus /></div>
                            </div>
                        )
                    })}
                </div> 
                : null}
            {allFredag ? 
                <div className='user__fredag'>
                    <h3>Fredag</h3>
                    {allFredag.map((band) => {
                        return (
                            <div key={band.id} className="card">
                                <p className={`card__time ${spaceBegone(band.stage)}`}>{band.time}</p>
                                <p className='card__name'>{band.name}</p>
                                <div className="card__add" data-id={band.id} onClick={addToMyProgramHandler}><RxPlus /></div>
                            </div>
                        )
                    })}
                </div> 
                : null}
            {allLørdag ? 
                <div className='user__lørdag'>
                    <h3>Lørdag</h3>
                    {allLørdag.map((band) => {
                        return (
                            <div key={band.id} className="card">
                                <p className={`card__time ${spaceBegone(band.stage)}`}>{band.time}</p>
                                <p className='card__name'>{band.name}</p>
                                <div className="card__add" data-id={band.id} onClick={addToMyProgramHandler}><RxPlus /></div>
                            </div>
                        )
                    })}
                </div> 
                : null}
        </div>
    )
}
