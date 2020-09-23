import React from 'react'
import {instance} from "./api/connections";



const OpusForm = ({connectionId, ownershipProof}) => {

    let [username, setUsername] = React.useState("");

    let requestCredential = () => {
        let path = "/credential/github/openmined"
        instance.post(path, {
            "username": username
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log("Error", error)
        })
    }

    return (
        <div>
            <h2>Paste this ownership proof in your GitHub profile</h2>
            <div>{ownershipProof}</div>
            <div>Enter your Github username and request credential when ready</div>
            <input type="text" placeholder="Github Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <button onClick={() => requestCredential()}>Submit</button>
        </div>
    )
}

export default OpusForm
