import React, {useState} from 'react'
import "./Footer.css"
import {HiOutlineMail} from "react-icons/hi"
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

export default function Footer() {

    const [signUp, setSignUp] = useState(true);
    const [error, setError] = useState(false);


    
    const formHandler = async (values) => {

        const tempObject = {
            newsEmail: values.target.newsEmail.value
        }
        
        fetch("http://localhost:4000/subscribe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tempObject)
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            alert("Tak for din tilmelding!")
        })
        .catch((err) => {
            console.log("Error msg: ", err)
            setError(err)
        })
    }

    const signupSchema = Yup.object().shape({
        newsEmail: Yup.string()
                    .email("Indtast venligst en rigtig email.")
                    .required("Det kræver ligesom en mail.")
    })


    return (
        <footer className='footer' style={{backgroundImage: `url(/Hero3.png)`}}>
            <h2>TILMELD NYHEDSBREV</h2>
            <p>Få de seneste nyheder sendt til din indbakke</p>

            <Formik
            initialValues={{newsEmail: "Indtast emailaddresse"}}
            validationSchema={signupSchema}
            onSubmit={formHandler}
            >
                <Form onSubmit={formHandler}>
                    <div className="newsletter__emailIconWrapper">
                        <HiOutlineMail />
                    </div>
                    <Field type="newsEmail" name="newsEmail" id="newsEmail" />
                    <ErrorMessage name='newsEmail' />
                    <button type="submit">TILMELD</button>
                </Form>
            </Formik>

            <div className="footer__logo">
                <img src="/Hancock_logo.png" alt="logo" />
            </div>
        </footer>
    )



}