"use strict"

async function setStatus(player_id, status) {
    // @params player_id: String
    // @params status: String (Enum: ['Online', 'Waiting', 'Playing', 'Offline'])
    // return JSOn
    const resp = await fetch(`http://localhost:3000/api/user/setstatus/${player_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            status: status
        })
    })

    const data = await resp.json()
    return data
}

module.exports = {
    setStatus: setStatus
}