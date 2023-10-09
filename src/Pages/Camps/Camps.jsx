import React from 'react'
import "./Camps.css"


export default function Camps() {




    return (
        <main className='camps'>
            <div className="topHero">
                <img src="/Hero3.png" alt="Hero Image" />
            </div>

            <h1>Camp Info</h1>

            <article className="camps__cInformation">
                <div className="cInformation__imgWrapper">
                    <img src="/mediesuset-map.jpg" alt="Kort over pladsen" />
                </div>
                <div className="cInformation__cInfo">
                    <section className="cInfo__camp">
                        <h2>Camp Colorit</h2>

                        <ul>
                            <li><b>Størrelse</b>: 1200 pladser.</li>
                            <li><b>Adgang</b>: Alle med armbånd.</li>
                            <li><b>Faciliteter</b>: Gode toiletforhold, bad mod betaling og mulighed for pladsreservation.</li>
                        </ul>
                    </section>
                    
                    <section className="cInfo__camp">
                        <h2>Camp Kultunaut</h2>

                        <ul>
                            <li><b>Størrelse</b>: 600 pladser.</li>
                            <li><b>Adgang</b>: Dem med et 4 dages partout armbånd.</li>
                            <li><b>Faciliteter</b>: Gode toiletforhold, gratis bad, mulighed for strøm, cafeer og madsteder.</li>
                        </ul>
                    </section>
                    
                    <section className="cInfo__camp">
                        <h2>Camp Colorit</h2>

                        <ul>
                            <li><b>Størrelse</b>: 400 pladser.</li>
                            <li><b>Adgang</b>: Dem med et 4 dages De Luxe armbånd.</li>
                            <li><b>Faciliteter</b>: Et telt, meget gode toilet og badeforhold, mulighed for morgenmad, en gratis madbillet dagligt til festivalens spisesteder.</li>
                        </ul>
                    </section>
                </div>
            </article>
        </main>
    )
}