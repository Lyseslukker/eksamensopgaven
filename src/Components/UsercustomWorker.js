
self.addEventListener("message", (e) => {
    // console.log(e.data)
    // Fetch program
    fetch(`http://localhost:4000/my-program?userId=${e.data.id}`, {
        headers: {
            "Authorization": `Bearer ${e.data.token}`
        }
    })
    .then((response) => {
        // console.log("FETCH RESPONSE: ", response)
        return response.json()
    })
    .then((firstDatas) => {
        // console.log("FETCH DATA: ", firstDatas)
        if (firstDatas === "Private resource access: entity must have a reference to the owner id") {
            return "no-program"
        }
        // Fetch individual bands
        return Promise.all(
            firstDatas.map((band) => {
                return fetch(`http://localhost:4000/bands/${band.band}`)
            })
        )
        .then((responses) => {
            // console.log(responses)
            return Promise.all(
                responses.map((response) => {
                    return response.json()
                })
            )
        })
        .then((secondDatas) => {
            // console.log(secondDatas)
            return {firstDatas, secondDatas}
        })
    })
    .then((bothDatas) => {
        // console.log("FETCH FINAL DATA: ", bothDatas)
        self.postMessage(bothDatas)
    })

})




