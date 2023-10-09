import React from 'react'
import "./CustomError.css"

export default function Error({msg}) {

    console.log(msg)

    return (
        <div className='error'>
            <h1>Error</h1>
        </div>
    )
}