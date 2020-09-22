import React from 'react'
import {createInvite} from "./api/connections";

const Invite = () => {

    React.useEffect(() => {
        createInvite().then(response => {
            console.log(response)

        })
    })

    return (
        <div>This is an invite</div>
    )
}

export default Invite
