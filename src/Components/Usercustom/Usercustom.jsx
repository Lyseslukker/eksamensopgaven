import React, {useState, useEffect, useContext} from 'react'
import UserContext from "../../Components/Context/UserContext";
import Cookies from 'js-cookie';
import {RxCross2} from "react-icons/rx"
import CustomError from "../../Pages/Error/CustomError"
import CustomLoading from "../../Pages/Loading/CustomLoading"
import "../../Pages/Userpage/Userpage"

export default function Usercustom() {

    const { userLogin, setUserLogin } = useContext(UserContext)

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const [update, setUpdate] = useState(0);

    const [myOnsdag, setMyOnsdag] = useState([]);
    const [myTorsdag, setMyTorsdag] = useState([]);
    const [myFredag, setMyFredag] = useState([]);
    const [myLørdag, setMyLørdag] = useState([]);


    // WORKER
    const myWorker = new Worker("./src/Components/UsercustomWorker.js")


    const deleteBandFromMyProgram = (e) => {

        const deleteId = e.currentTarget.dataset.deleteid
        console.log(e.currentTarget.dataset.deleteid)

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
            setMyOnsdag([])
            setMyTorsdag([])
            setMyFredag([])
            setMyLørdag([])
            setLoading(true)
            setUpdate((prev) => prev + 1)
            // console.log(data)
        })
    }

    
    useEffect(() => {
        console.warn("FETCHED!")
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

            myWorker.postMessage(userLogin)

            const eventTemp = (e) => {
                // console.log(e.data)
                if (e.data === "no-program") {
                    setLoading(false)
                }
                else {
                    e.data.secondDatas.map((secondData, i) => {
                        if (secondData.day === "Onsdag") {
                            setMyOnsdag((prev) => {
                                return [
                                    ...prev,
                                    {
                                        ...secondData,
                                        deleteId: e.data.firstDatas[i]
                                    }
                                ]
                            })
                        }
                        if (secondData.day === "Torsdag") {
                            setMyTorsdag((prev) => {
                                return [
                                    ...prev,
                                    {
                                        ...secondData,
                                        deleteId: e.data.firstDatas[i]
                                    }
                                ]
                            })
                        }
                        if (secondData.day === "Fredag") {
                            setMyFredag((prev) => {
                                return [
                                    ...prev,
                                    {
                                        ...secondData,
                                        deleteId: e.data.firstDatas[i]
                                    }
                                ]
                            })
                        }
                        if (secondData.day === "Lørdag") {
                            setMyLørdag((prev) => {
                                return [
                                    ...prev,
                                    {
                                        ...secondData,
                                        deleteId: e.data.firstDatas[i]
                                    }
                                ]
                            })
                        }
                    })
                    
                    setLoading(false)
                }
                

                myWorker.removeEventListener("message", eventTemp)
            }
            myWorker.addEventListener("message", eventTemp)
        }
        else {
            setUserLogin({
                user: false,
                token: false,
                id: false
            })
            navigate("/login")
        }
    }, [update]);


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

            {myOnsdag.length > 0 ? 
                <div className='user__onsdag'>
                    <h3>Onsdag</h3>
                    {myOnsdag.map((band) => {
                        // console.log(band)
                        return (
                            <div key={band.id} className="card">
                                <p className={`card__time ${spaceBegone(band.stage)}`}>{band.time}</p>
                                <p className='card__name'>{band.name}</p>
                                <div className="card__delete" data-deleteid={band.deleteId.id} onClick={deleteBandFromMyProgram}><RxCross2 /></div>
                            </div>
                        )
                    })}
                </div> 
                : null}
            {myTorsdag.length > 0 ? 
                <div className='user__torsdag'>
                    <h3>Torsdag</h3>
                    {myTorsdag.map((band) => {
                        return (
                            <div key={band.id} className="card">
                                <p className={`card__time ${spaceBegone(band.stage)}`}>{band.time}</p>
                                <p className='card__name'>{band.name}</p>
                                <div className="card__delete" data-deleteid={band.deleteId.id} onClick={deleteBandFromMyProgram}><RxCross2 /></div>
                            </div>
                        )
                    })}
                </div> 
                : null}
            {myFredag.length > 0 ? 
                <div className='user__fredag'>
                    <h3>Fredag</h3>
                    {myFredag.map((band) => {
                        return (
                            <div key={band.id} className="card">
                                <p className={`card__time ${spaceBegone(band.stage)}`}>{band.time}</p>
                                <p className='card__name'>{band.name}</p>
                                <div className="card__delete" data-deleteid={band.deleteId.id} onClick={deleteBandFromMyProgram}><RxCross2 /></div>
                            </div>
                        )
                    })}
                </div> 
                : null}
            {myLørdag.length > 0 ? 
                <div className='user__lørdag'>
                    <h3>Lørdag</h3>
                    {myLørdag.map((band) => {
                        return (
                            <div key={band.id} className="card">
                                <p className={`card__time ${spaceBegone(band.stage)}`}>{band.time}</p>
                                <p className='card__name'>{band.name}</p>
                                <div className="card__delete" data-deleteid={band.deleteId.id} onClick={deleteBandFromMyProgram}><RxCross2 /></div>
                            </div>
                        )
                    })}
                </div> 
                : null}

            {myOnsdag.length === 0 && myTorsdag.length === 0 && myFredag.length === 0 && myLørdag.length === 0 ?
                <div className='user__empty'><h3>Du har intet program</h3></div> : null }
        </div>
    )
}
