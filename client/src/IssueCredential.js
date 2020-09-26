import React from 'react'
import OpusForm from "./OpusForm";
import PryConForm from "./PryConForm";

const IssueCredential = ({connectionId, ownershipProof}) => {
    let [credOffered, setCredOffered] = React.useState(false)
    let [contributorView, setContributorView] = React.useState(false)

    return credOffered ? (<div>
        <h2>Congratulations, you should now receive a credential offer on your phone.</h2>
        <h3>Don't forget to check out <a href="https://github.com/OpenMined/PyDentity">our repo</a>, with open source tools and tutorials that can help you implement these capabilities into your application</h3>
    </div>) : (
        <div>
            <h3>Issue yourself a credential</h3>
            <button onClick={() => setContributorView(!contributorView)}>{contributorView ? "Issue OpenMined PryCon Attendance" : "Issue OpenMined Contributor Credential"}</button>

            {contributorView ?
                <OpusForm connectionId={connectionId} ownershipProof={ownershipProof} setCredOffered={setCredOffered}/> :
                <PryConForm setCredOffered={setCredOffered} connectionId={connectionId}/>
            }




        </div>
    )

}

export default IssueCredential
