import React from 'react'

const OpusForm = ({connectionId, ownershipProof}) => {

    return (
        <div>
            <h2>Paste this url in your GitHub profile</h2>
            <div>{ownershipProof}</div>
        </div>
    )
}

export default OpusForm
