import React from 'react'
import {createInvite} from "./api/connections";

const Invite = () => {
    let [base64qr, setBase64qr] = React.useState(null)
    React.useEffect(() => {
        createInvite().then(response => {
            console.log(response.data)
            // console.log(btoa(response.data))
            // console.log(atob(response.data))
            setBase64qr(response.data)
        }, [])
    })

    return base64qr ? (
        <div className="qr-code">
            <img src={"data:image/png;base64, " + base64qr} />
        </div>
    ) : (
        <div>This is an invite</div>
    )
}

export default Invite
