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
                <h1>Unfortunately we could not process your OpenMined credential</h1>
                <h2>Perhaps try issuing the PryCon attendance credential instead.</h2>
            </div>
        )
        :(
        <div>
            <h2>Are you an OpenMined Contributor on GitHub?</h2>
            <h3>Help us test out our OPUS service and get a verifiable credential at the same time</h3>
            <h3>Note: You must have you OpenMined organisation membership <a href="https://docs.github.com/en/github/setting-up-and-managing-your-github-user-account/publicizing-or-hiding-organization-membership"> set to public in GitHub</a></h3>
            <h3>First paste this ownership proof token into your GitHub profile:</h3>
            <img class="" src="github_ownership.png" alt="demo"></img>
            <h4>"{ownershipProof}"</h4>
            <div>Enter your Github username and request credential when ready</div>
            <input type="text" placeholder="Github Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <button onClick={() => requestCredential()}>Submit</button>
        </div>)

}

export default OpusForm
