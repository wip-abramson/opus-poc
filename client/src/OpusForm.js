import React from 'react'

const OpusForm = ({connectionId, ownershipProof}) => {

    let [username, setUsername] = React.useState("");

    return (
        <div>
            <h2>Paste this ownership proof in your GitHub profile</h2>
            <div>{ownershipProof}</div>
            <div>Enter your Github username and request credential when ready</div>
            <input type="text" placeholder="Github Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <button>Submit</button>
        </div>
    )
}

export default OpusForm
