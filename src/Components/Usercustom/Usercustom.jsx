import React, {useState, useEffect, useContext} from 'react'
import {RxCross2} from "react-icons/rx"
import CustomError from "../../Pages/Error/CustomError"
import CustomLoading from "../../Pages/Loading/CustomLoading"
import "../../Pages/Userpage/Userpage"
import { fetchProgram, updateDay, collectDays, sortPerDay } from '../../customHooks/fetchProgram'
import {useUser} from "../../customHooks/user"

export default function Usercustom() {


    const {userLogin, setUserLogin} = useUser()

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [myProgram, setMyProgram] = useState();
    // const [avalibleDays, setAvalibleDays] = useState([]);


    const newFunction = async () => {
        try {
            const newFetch = await fetchProgram(userLogin)
            // setAvalibleDays(collectDays(newFetch))
            // setMyProgram(newFetch)
            setMyProgram(sortPerDay(newFetch))
            setLoading(false)


            // sortPerDay(newFetch)   
        } 
        catch (error) {
            setError("Server error, try again.")
        }
    }


    const deleteBandFromMyProgram = (e) => {

        const deleteId = e.currentTarget.dataset.deleteid

        fetch(`http://localhost:4000/my-program/${deleteId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userLogin.token}`
            }
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setLoading(true)
            newFunction()
            // console.log(data)
        })
    }

    useEffect(() => {
        if (!userLogin) {
            return
        }
        else {
            newFunction()
        }
    }, [userLogin]);


    const spaceBegone = (classname) => {
        return classname.split(' ').join('_')
    }
    
    
    if (error) return <CustomError msg={error} />
    

    if (loading) return <CustomLoading />
    

    if (!myProgram) return <div className='user__empty'><h3>Du har intet program</h3></div>

    // console.log("Myprogram", myProgram)
    return (
        <div className='user'>

            {myProgram.map((day) => {
                return (
                    <div key={day[0].day} className={`user__${day[0].day}`}>
                        <h3>{day[0].day}</h3>
                        {day.map((band) => {
                            return (
                                <div key={band.id} className="card">
                                    <p className={`card__time ${spaceBegone(band.stage)}`}>{band.time}</p>
                                    <p className='card__name'>{band.name}</p>
                                    <div className="card__delete" data-deleteid={band.deleteId.id} onClick={deleteBandFromMyProgram}><RxCross2 /></div>
                                </div>
                            )
                        })}
                    </div>
                )
                
            })}


            {/* {avalibleDays.map((day) => {
                return (
                    updateDay(day, myProgram).length > 0 ? 
                    <div key={day} className={`user__${day}`}>
                        <h3>{day}</h3>
                        {updateDay(day, myProgram).map((band) => {
                            return (
                                <div key={band.id} className="card">
                                    <p className={`card__time ${spaceBegone(band.stage)}`}>{band.time}</p>
                                    <p className='card__name'>{band.name}</p>
                                    <div className="card__delete" data-deleteid={band.deleteId.id} onClick={deleteBandFromMyProgram}><RxCross2 /></div>
                                </div>
                            )
                        })}
                    </div> 
                    : null
                )
            })} */}
        </div>
    )
}
