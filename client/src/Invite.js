import React from 'react'
import {createInvite, checkActive} from "./api/connections";
import QrCode from './QrCode'



const Invite = ({setConnectionId, setOwnershipProof}) => {
    let [inviteUrl, setInviteUrl] = React.useState(null)
    React.useEffect(() => {
        console.log("USE EFFECT")
        createInvite().then(response => {
            console.log(response)
            // console.log(btoa(response.data))
            // console.log(atob(response.data))
            setInviteUrl(response.data.invite_url)
            let connectionId = response.data.connection_id
            setConnectionId(connectionId)
            setOwnershipProof(response.data.ownership_proof)

        }).catch(error => {
            console.log("ERROR", error)
        })
    }, [])




    return inviteUrl ? (
        <div className="qr-code">
            <QrCode url={inviteUrl}/>
        </div>
    ) : (
        <div>Loading invite</div>
    )
}

export default Invite
