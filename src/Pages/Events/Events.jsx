import React, {useState, useEffect} from 'react'
import "./Events.css"
import EventComponent from '../../Components/EventComponent/EventComponent';

export default function Events() {

    const [chosenDay, setChosenDay] = useState("Onsdag");

    
    const dayPickerHandler = (e) => {
        setChosenDay(e.currentTarget.dataset.day)
    }
    

    return (
        <div className='events'>
            <div className="topHero">
                <img src="/Hero3.png" alt="Hero Image" />
            </div>

            <h1>PROGRAM</h1>

            <div className="events__dayPicker">
                <div className={chosenDay==="Onsdag" ? "eventDayClicked" : ""} data-day="Onsdag" onClick={dayPickerHandler}><h2>ONSDAG</h2></div>
                <div className={chosenDay==="Torsdag" ? "eventDayClicked" : ""} data-day="Torsdag" onClick={dayPickerHandler}><h2>TORSDAG</h2></div>
                <div className={chosenDay==="Fredag" ? "eventDayClicked" : ""} data-day="Fredag" onClick={dayPickerHandler}><h2>FREDAG</h2></div>
                <div className={chosenDay==="Lørdag" ? "eventDayClicked" : ""} data-day="Lørdag" onClick={dayPickerHandler}><h2>LØRDAG</h2></div>
            </div>

            <EventComponent clickedDay={chosenDay} />
        </div>
    )
}