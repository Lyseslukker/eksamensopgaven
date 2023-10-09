import React, {useState, useEffect, useContext} from 'react'
import { Formik, Field, Form, ErrorMessage, useFormikContext } from 'formik'
import * as Yup from 'yup'
import "./Billetter.css"
import UserContext from "../../Components/Context/UserContext";
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';


export default function Billetter() {

    const [checkOut, setCheckOut] = useState([0,0,0,0,0,0]);
    const [bestilling, setBestilling] = useState(false);
    const [confirmBuy, setConfirmBuy] = useState(false);

    const { userLogin, setUserLogin } = useContext(UserContext)
    const navigate = useNavigate()

    // FORM
    const ticketHandler = (e) => {
        e.preventDefault()

        const temp = [
            {
                id: 1,
                name: "ALM. PARTOUTBILLET",
                price: 1495,
                number: Number(e.target.alm.value)
            },
            {
                id: 2,
                name: "PARTOUTBILLET DELUXE",
                price: 1995,
                number: Number(e.target.deluxe.value)
            },
            {
                id: 3,
                name: "BILLET - ONSDAG",
                price: 600,
                number: Number(e.target.onsdag.value)
            },
            {
                id: 4,
                name: "BILLET - TORSDAG",
                price: 600,
                number: Number(e.target.torsdag.value)
            },
            {
                id: 5,
                name: "BILLET - FREDAG",
                price: 600,
                number: Number(e.target.fredag.value)
            },
            {
                id: 6,
                name: "BILLET - LØRDAG",
                price: 600,
                number: Number(e.target.lørdag.value)
            }
        ]

        const filteredTickets = temp.filter((ticket) => {
            return ticket.number > 0
        })

        console.log(filteredTickets)
        setBestilling(filteredTickets)
    }
    
    // BUTTON DISABLE
    const checkOutChecker = () => {
        const sum = checkOut.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
        }, 0);

        if (sum === 0) {
            console.log("Returned true")
            return true
        }
        else {
            console.log("Returned false")
            return false
        }
    }


    const signupSchema = Yup.object().shape({
        email: Yup.string()
                    .email("Skriv venligst en rigtig email")
                    .required("En email er påkrævet"),

        password: Yup.string()
                    .min(6, "Kodeordet skal minimum være 6 karaktere")
                    .required("Et kodeord er påkrævet"),

        confirmPassword: Yup.string()
                    .required("Bekræft venligst password")
                    .oneOf([Yup.ref('password')], "Kodeordet skal matche hinanden"),

        name: Yup.string()
                    .required("Skriv venligst dit navn"),
        
        address: Yup.string()
                    .required("En dansk addresse er påkrævet")
                    .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])/, "En addresse har både tal og bogstaver"),
        
        zip: Yup.number()
                    .required("Et postnummer er påkrævet")
                    .min(4, "Et postnummer er på minimum 4 cifre"),

        city: Yup.string()
                    .required("Skriv venligst din by"),

        pickup: Yup.string()
                    .required("Vælg venligst en af mulighederene")
    })


    const finalFormHandler = async (values) => {

        console.log(checkOut)

        const temp = {
            "email": values.email,
            "password": values.password,
            "name": values.name,
            "address": values.address,
            "zip-code": values.zip,
            "city": values.city,
            "ticket-pickup": values.pickup,
            "camp": "default",
            "ticket-count": checkOut
        }

        fetch("http://localhost:4000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(temp)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("From form submit", data)
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
        .catch((err) => {
            console.log("Error: ", err)
        })
        
        console.log(temp)
    }

    


    if (bestilling) {
        return (
            <main className='billetter'>
                <div className="topHero">
                    <img src="/Hero3.png" alt="Hero Image" />
                </div>
    
                <h1>Billetter</h1>
    
                <article className="billetter__tickets">
                    <section className="tickets__ticketsInfo">
                        <div className="ticketsInfo__header">
                            <h2>INFORMATION OM DEN VALGTE BILLET</h2>
                        </div>
                        <div className="ticketsInfo__partout__body">
                            <h3>Almindelig partoutbillet - 4 dage</h3>

                            <p>
                                Billetten giver adgang til Mediesusetsfestivalplads fra onsdag d. 4. juli til lørdag d. 7. juli. <br/>
                                Billetten ombyttes til et armbånd ved en af billetvognene ved festivalpladsens indgang. <br/>
                                Billetten giver fri adgang til festivalpladsen, alle scener, spisesteder og aktiviteter. 
                            </p>
                        </div>
                        <div className="ticketsInfo__enkelt__body">
                            <h3>Enkelt dags billet</h3>
    
                            <p>
                                Billetten giver adgang til den største af festivalens campingområder med 1200 pladser og mulighed for plads reservation ved<br/>
                                bestilling. Alle med armbånd har adgang til denne camps og der er gode toiletforhold og mulighed for bad<br/>
                                mod betaling.
                            </p>
                        </div>
                    </section>
    
                    <section className="tickets__ticketsOrder">
                        <div className="ticketsOrder__header"><h2>BESTILLING</h2></div>

                        <div className="ticketsOrder__body">
                            {bestilling.map((ticket) => {
                                return (
                                    <div key={ticket.id} className="body__ticket">
                                        <p>Antal: {ticket.number} stk.</p>
                                        <p>{ticket.name}</p>
                                        <p>DKK {ticket.price},00</p>
                                        <p>DKK {ticket.price * ticket.number},00</p>
                                    </div>
                                )
                            })}
                            <div className="body__ticketsTotal">
                                <p>Pris i alt:</p>
                                <p>DKK {bestilling.reduce((acc, ticket) => acc + ticket.price * ticket.number, 0)},00</p>
                            </div>
                        </div>
                    </section>

                    <section className="tickets__finalForm">
                        <Formik
                            initialValues={{
                                email: "", 
                                password: "",
                                confirmPassword: "",
                                name: "",
                                address: "",
                                zip: "",
                                city: "",
                                pickup: "false"
                            }}
                            validationSchema={signupSchema}
                            onSubmit={finalFormHandler}
                        >
                            <Form className='formikForm'>
                                <label htmlFor="email">Email: </label>
                                <Field type="email" name="email" id="email" placeholder="Indtast din email" />
                                <ErrorMessage name="email" component="p" className='formikForm__errorMsg' />
                                
                                <label htmlFor="password">Password: </label>
                                <Field type="password" name="password" id="password"  />
                                <ErrorMessage name="password" className='formikForm__errorMsg' component="p" />

                                <label htmlFor="confirmPassword">Gentag adgangskode: </label>
                                <Field type="password" name="confirmPassword" id="confirmPassword" />
                                <ErrorMessage name="confirmPassword" className='formikForm__errorMsg' component="p" />

                                <label htmlFor="name">Navn: </label>
                                <Field type="text" name="name" id="name" placeholder="Indtast dit navn" />
                                <ErrorMessage name="name" className='formikForm__errorMsg' component="p" />

                                <label htmlFor="address">Addresse: </label>
                                <Field type="text" name="address" id="address" placeholder="Indtast din addresse" />
                                <ErrorMessage name="address" className='formikForm__errorMsg' component="p" />

                                <label htmlFor="zip">Postnummer: </label>
                                <Field type="number" name="zip" id="zip" placeholder="2635" />
                                <ErrorMessage name="zip" className='formikForm__errorMsg' component="p" />

                                <label htmlFor="city">By: </label>
                                <Field type="text" name="city" id="city" placeholder="Indtast dit bynavn"  />
                                <ErrorMessage name="city" className='formikForm__errorMsg' component="p" />

                                <div id="my-radio-group">Vælg forsendelsesmetode: </div>
                                <div className='my-radio-group__wrapper' role='group' aria-labelledby="my-radio-group">
                                    {/* TICKET PICKUP: FALSE */}
                                    <label>
                                        <Field type="radio" name="pickup" value={"false"}  />
                                        Jeg ønsker billetterne tilsendt
                                    </label>
                                    {/* TICKET PICKUP: TRUE */}
                                    <label>
                                        <Field type="radio" name="pickup" value={"true"} />
                                        Jeg udskriver billetterne selv
                                    </label>
                                </div>
                                <ErrorMessage name="pickup" className='formikForm__errorMsg' component="p" />

                                {confirmBuy ? <div className='secondSubmit'>
                                                <button className='secondSubmit__confirm' type='submit'>Bekræft</button> <button className='secondSubmit__cancel' onClick={() => setConfirmBuy(false)}>Annuler</button>
                                              </div> 
                                : <button className='firstSubmit' onClick={() => setConfirmBuy(true)}>Send</button>}
                                
                            </Form>
                        </Formik>
                    </section>
                </article>
            </main>
        )
    }


    return (
        <main className="billetter">
            <div className="topHero">
                <img src="/Hero3.png" alt="Hero Image" />
            </div>

            <h1>Billetter</h1>

            <form onSubmit={ticketHandler} className="billetter__orderTickets">
                
                <div className="orderTickets__partout">
                    <div className="partout__header"><h2>PARTOUT BILLETTER - ALLE DAGE</h2></div>
                    
                    <div className="partout__listItem">
                        <p>ALM. PARTOUTBILLET</p>
                        <p>1495,00 DKK</p>
                        <input type="number" name="alm" id="alm" placeholder={checkOut[0]} onChange={(e) => {
                            const newValue = Number(e.target.value)
                            const updatedCheckout = [...checkOut]
                            updatedCheckout[0] = newValue
                            setCheckOut(updatedCheckout)
                        }} />
                    </div>

                    <div className="partout__listItem">
                        <p>PARTOUTBILLET DELUXE</p>
                        <p>1995,00 DKK</p>
                        <input type="number" name="deluxe" id="deluxe" placeholder={checkOut[1]} onChange={(e) => {
                            const newValue = Number(e.target.value)
                            const updatedCheckout = [...checkOut]
                            updatedCheckout[1] = newValue
                            setCheckOut(updatedCheckout)
                        }} />
                    </div>
                </div>

                <div className="orderTickets__enkelt">
                    <div className="enkelt__header"><h2>ENKELTBILLETTER</h2></div>
                    
                    <div className="enkelt__listItem">
                        <p>BILLET - ONSDAG</p>
                        <p>600,00 DKK</p>
                        <input type="number" name="onsdag" id="onsdag" placeholder={checkOut[2]} onChange={(e) => {
                            const newValue = Number(e.target.value)
                            const updatedCheckout = [...checkOut]
                            updatedCheckout[2] = newValue
                            setCheckOut(updatedCheckout)
                        }} />
                    </div>
                    
                    <div className="enkelt__listItem">
                        <p>BILLET - TORSDAG</p>
                        <p>600,00 DKK</p>
                        <input type="number" name="torsdag" id="torsdag" placeholder={checkOut[3]} onChange={(e) => {
                            const newValue = Number(e.target.value)
                            const updatedCheckout = [...checkOut]
                            updatedCheckout[3] = newValue
                            setCheckOut(updatedCheckout)
                        }} />
                    </div>
                    
                    <div className="enkelt__listItem">
                        <p>BILLET - FREDAG</p>
                        <p>600,00 DKK</p>
                        <input type="number" name="fredag" id="fredag" placeholder={checkOut[4]} onChange={(e) => {
                            const newValue = Number(e.target.value)
                            const updatedCheckout = [...checkOut]
                            updatedCheckout[4] = newValue
                            setCheckOut(updatedCheckout)
                        }} />
                    </div>
                    
                    <div className="enkelt__listItem">
                        <p>BILLET - LØRDAG</p>
                        <p>600,00 DKK</p>
                        <input type="number" name="lørdag" id="lørdag" placeholder={checkOut[5]} onChange={(e) => {
                            const newValue = Number(e.target.value)
                            const updatedCheckout = [...checkOut]
                            updatedCheckout[5] = newValue
                            setCheckOut(updatedCheckout)
                        }} />
                    </div>
                </div>
                <div className="orderTickets__submit">
                    <button type="submit" disabled={checkOutChecker()}>KØB BILLETTER</button>
                </div>
            </form>
        </main>
    )
}