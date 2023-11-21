
export const fetchProgram = async (e) => {

    try {
        const fetchIds = await fetch(`http://localhost:4000/my-program?userId=${e.id}`, {
            headers: {
                "Authorization": `Bearer ${e.token}`
            }
        })
        // ProgramIds
        const programIds = await fetchIds.json()
        
        // console.log(programIds)

        if (programIds === "Private resource access: entity must have a reference to the owner id") {
            // return "no-program"
            return false
        }
        else {
            const fetchBands = await Promise.all(
                programIds.map((band) => {
                    return fetch(`http://localhost:4000/bands/${band.band}`)
                })
            )
            // Bands
            const bands = await Promise.all(
                fetchBands.map((response) => {
                    return response.json()
                })
            )

            const updated = bands.map((band, i) => {
                return {
                    ...band,
                    deleteId: programIds[i]
                }
            })

            return updated 
        }

    } 
    catch (error) {
        return error
    }
}

export const sortPerDay = (data) => {
    const avalibleDays = collectDays(data)

    const sortedBands = avalibleDays.map((day) => {
        return updateDay(day, data)
    })

    return sortedBands
}

export const updateDay = (day, data) => {
    const filteredByDay = data.filter((band) => {
        return band.day === day
    })
    
    return filteredByDay
}


export const collectDays = (data) => {
    const daysArray = []
    if (!data) {
        return daysArray
    }
    else {
        data.map((band) => {
            if (daysArray.includes(band.day) === false) {
                daysArray.push(band.day)
            }
        })
        return daysArray
    }
}



export const fetchAllBands = async () => {
    const avalibleDays = [
        "Onsdag",
        "Torsdag",
        "Fredag",
        "Lørdag"
    ]

    const fetchBands = await Promise.all(
        avalibleDays.map((day) => {
            return fetch(`http://localhost:4000/bands?day=${day}`)
        })
    )
    
    const allBands = await Promise.all(
        fetchBands.map((response) => {
            return response.json()
        })
    )

    // console.log(allBands)
    return allBands
}