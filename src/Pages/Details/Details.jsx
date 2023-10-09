import React, {useEffect, useState} from 'react'
import "./Details.css"
import CustomLoading from "../Loading/CustomLoading"
import CustomError from "../Error/CustomError"
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


export default function Details() {

    const navigate = useNavigate()
    
    const {id} = useParams()

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:4000/news/${id}`)
            .then(response => response.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
            .catch((err) => {
                setError(err)
                setLoading(false)
            })
    }, []);
    

    if (error) {
        return <CustomError msg={error} />
    }

    if (loading) {
        return <CustomLoading />
    }
    
    return (
        <div className='details'>
            <div className="details__imgWrapper">
                <img src={data.image.src} alt={data.image.title} />
            </div>
            <div className="details__info">
                <h1>{data.title}</h1>
                {data.body.map((paragraphs, i) => {
                    return <p key={i}>{paragraphs}</p>
                })}
                <Link onClick={() => {navigate(-1)}}>TILBAGE</Link>
            </div>
        </div>
    )
}