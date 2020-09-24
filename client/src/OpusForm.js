import React from 'react'
import {instance} from "./api/connections";



const OpusForm = ({connectionId, ownershipProof, setCredOffered}) => {

    let [username, setUsername] = React.useState("");
    let [issuerError, setIssuerError] = React.useState(false)

    let requestCredential = () => {
        let path = "/credential/github/openmined"
        instance.post(path, {
            "username": username,
            "connection_id": connectionId
        }).then(response => {
            setUsername("")
            setCredOffered(true)
            console.log(response)
        }).catch(error => {
            setIssuerError(true)
            console.log("Error", error)
        })
    }

    return issuerError ? (
            <div>
                <h1>Unfortunately we ran into an error</h1>
                <h2>Perhaps try issuing the PryCon attendance credential instead.</h2>
            </div>
        )
        :(
        <div>
            <h1>Are you an OpenMined Contributor on GitHub?</h1>
            <h2>Help us test out our OPUS service and get a verifiable credential at the same time</h2>
            <h3>Note: You must have you OpenMined organisation membership <a href="https://docs.github.com/en/github/setting-up-and-managing-your-github-user-account/publicizing-or-hiding-organization-membership"> set to public in GitHub</a></h3>
            <h2>First paste this ownership proof token into your GitHub profile:</h2>
            <h3>{ownershipProof}</h3>
            <div>Enter your Github username and request credential when ready</div>
            <input type="text" placeholder="Github Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <button onClick={() => requestCredential()}>Submit</button>
        </div>)

}

export default OpusForm
