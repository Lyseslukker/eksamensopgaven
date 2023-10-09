import React, {useEffect, useState} from 'react'
import { motion } from 'framer-motion';
import CustomError from "../../Pages/Error/CustomError"
import CustomLoading from "../../Pages/Loading/CustomLoading"
import "./EventComponent.css"
import {MdOutlineOpenInNew} from "react-icons/md"
import {FaTwitter, FaFacebookSquare, FaInstagram} from "react-icons/fa"
import {RxCross2} from "react-icons/rx"


export default function EventComponent({clickedDay}) {

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [blue, setBlue] = useState();
    const [red, setRed] = useState();
    const [purple, setPurple] = useState();
    const [green, setGreen] = useState();

    // FRAMER-MOTION MODAL STATES
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalOrigin, setModalOrigin] = useState({ x: 0, y: 0 });
    const [modalData, setModalData] = useState();

    let sceneArray = [
        `http://localhost:4000/bands?day=${clickedDay}&stage=Blå Scene`,
        `http://localhost:4000/bands?day=${clickedDay}&stage=Rød Scene`,
        `http://localhost:4000/bands?day=${clickedDay}&stage=Lilla Scene`,
        `http://localhost:4000/bands?day=${clickedDay}&stage=Grøn Scene`
    ]

    useEffect(() => {
        Promise.all(
            sceneArray.map((url) => {
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
            console.log(datas)
            datas[0].length > 0 ? setBlue(datas[0]) : setBlue(null)
            datas[1].length > 0 ? setRed(datas[1]) : setRed(null)
            datas[2].length > 0 ? setPurple(datas[2]) : setPurple(null)
            datas[3].length > 0 ? setGreen(datas[3]) : setGreen(null)
            setLoading(false)
        })
    }, [clickedDay]);



    // FRAMER MOTION START
    const closeModalHandler = () => {
        setModalIsOpen(false);
    };

    const openModal = (artist, e) => {
        const rect = e.target.getBoundingClientRect();
        const x = rect.left + (rect.width / 2);
        const y = rect.top + (rect.height / 2);
        setModalOrigin({ x, y });
        setModalData(artist)
        setModalIsOpen(true);
    };

    useEffect(() => {
        const handleEscPress = (event) => {
            if (event.keyCode === 27 && modalIsOpen) {
                closeModalHandler();
            }
        };

    document.addEventListener('keydown', handleEscPress);

    return () => {
        document.removeEventListener('keydown', handleEscPress);
    };
    }, [modalIsOpen]);


    const spaceBegone = (classname) => {
        return classname.split(' ').join('_')
    }
    // FRAMER-MOTION END 



    if (error) {
        return <CustomError msg={error} />
    }

    if (loading) {
        return <CustomLoading />
    }

    return (
        <article className='eventComponent'>
            {blue ?
                <section className="eventComponent__eventCard">
                    <div className="eventCard__header eventBlue"><h3>Blå Scene</h3></div>
                    {blue.map((artist) => {
                        return (
                            <div onClick={(e) => openModal(artist, e)} key={artist.id} className="eventCard__artist">
                                <p>{artist.time}</p>
                                <p>{artist.name}</p>
                                <MdOutlineOpenInNew />
                            </div>
                        )
                    })}
                </section> 
                : null}

            {red ? 
                <section className="eventComponent__eventCard">
                    <div className="eventCard__header eventRed"><h3>Rød Scene</h3></div>
                    {red.map((artist) => {
                        return (
                            <div onClick={(e) => openModal(artist, e)} key={artist.id} className="eventCard__artist">
                                <p>{artist.time}</p>
                                <p>{artist.name}</p>
                                <MdOutlineOpenInNew />
                            </div>
                        )
                    })}
                </section>
            : null}

            {purple ? 
                <section className="eventComponent__eventCard">
                    <div className="eventCard__header eventPurple"><h3>Lilla Scene</h3></div>
                    {purple.map((artist) => {
                        return (
                            <div onClick={(e) => openModal(artist, e)} key={artist.id} className="eventCard__artist">
                                <p>{artist.time}</p>
                                <p>{artist.name}</p>
                                <MdOutlineOpenInNew />
                            </div>
                        )
                    })}
                </section>
            : null}
            
            {green ?
                <section className="eventComponent__eventCard">
                    <div className="eventCard__header eventGreen"><h3>Grøn Scene</h3></div>
                    {green.map((artist) => {
                        return (
                            <div onClick={(e) => openModal(artist, e)} key={artist.id} className="eventCard__artist">
                                <p>{artist.time}</p>
                                <p>{artist.name}</p>
                                <MdOutlineOpenInNew />
                            </div>
                        )
                    })}
                </section>
            : null}

            {modalIsOpen && (
                <div className='eventModal' onMouseDown={closeModalHandler} style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                    <motion.div className='eventModal__innerModalWrapper'
                        onMouseDown={(e) => e.stopPropagation()} 
                        initial={{ scale: 0.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                        style={{ 
                            transformOrigin: `${modalOrigin.x}px ${modalOrigin.y}px`, 
                            backgroundColor: "whitesmoke",
                            position: "absolute",
                            top: "5vw",
                            bottom: "5vw",
                            right: "5vw",
                            left: "5vw"
                        }}
                    >   
                        <div className="innerModalWrapper__closeIt" onClick={closeModalHandler}>
                            <RxCross2 />
                        </div>
                        {/* HEADER */}
                        <div className={`innerModalWrapper__modalHeader ${spaceBegone(modalData.stage)}`}><p>{modalData.stage} {modalData.time}</p></div>
                        {/* BODY */}
                        <div className="innerModalWrapper__modalBody">
                            <div className="modalBody__imgWrapper" style={{backgroundImage: `url(${modalData.image.src})`}}>
                                {/* <img src={modalData.image.src} alt={modalData.image.title} /> */}
                            </div>
                            <div className="modalBody__collectionWrapper">
                                <div className="collectionWrapper__infoWrapper">
                                    {modalData.description.map((paragraph, i) => {
                                        return (
                                            <p key={i}>{paragraph}</p>
                                        )
                                    })}
                                </div>
                                <div className="collectionWrapper__someWrapper">
                                    <div className="">
                                        <FaFacebookSquare />
                                    </div>
                                    <div className="">
                                        <FaTwitter />
                                    </div>
                                    <div className="">
                                        <FaInstagram />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </article>
    )

    

}