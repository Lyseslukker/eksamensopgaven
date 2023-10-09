import React, {useEffect, useState} from 'react'
import "./Home.css"
import CustomError from "../Error/CustomError"
import CustomLoading from "../Loading/CustomLoading"
import { Link } from 'react-router-dom'


export default function Home() {

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState(false);
    
    
    
    
    useEffect(() => {
        fetch("http://localhost:4000/news")
            .then(response => response.json())
            .then((data) => {
                setNews(data)
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
        <main className='home'>
            <div className="topHero">
                <img src="/Hero3.png" alt="Hero Image" />
            </div>

            <h1>NYHEDER</h1>

            <article className="home__newsList">
                {news.map((card) => {
                    console.log(card.body)
                    return (
                        <section key={card.id} className='newsList__card'>
                            <div className="card__imgWrapper" style={{backgroundImage: `url(${card.image.src})`}}>
                                {/* <img src={card.image.src} alt={card.image.title} /> */}
                            </div>
                            <div className="card__info">
                                <h2>{card.title}</h2>
                                <p>{card.body[2]}</p>
                                <Link to={`/details/${card.id}`}>Læs mere</Link>
                            </div>
                        </section>
                    )
                })}
            </article>
        </main>
    )
}