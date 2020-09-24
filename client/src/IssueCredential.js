import React from 'react'
import OpusForm from "./OpusForm";
import PryConForm from "./PryConForm";

const IssueCredential = ({connectionId, ownershipProof}) => {
    let [credOffered, setCredOffered] = React.useState(false)
    let [contributorView, setContributorView] = React.useState(false)

    return credOffered ? (<div>
        <h1>Congratulations, you should now receive a credential offer on your phone.</h1>
        <h2>Don't forget to check out <a href="https://github.com/OpenMined/PyDentity">our repo</a>, with open source tools and tutorials that can help you implement these capabilities into your application</h2>
    </div>) : (
        <div>
            <h1>Issue yourself a credential</h1>
            <button onClick={() => setContributorView(!contributorView)}>{contributorView ? "Issue OpenMined Contributor" : "Issue PryCon Attendance"}</button>

            {contributorView ?
                <OpusForm connectionId={connectionId} ownershipProof={ownershipProof} setCredOffered={setCredOffered}/> :
                <PryConForm setCredOffered={setCredOffered} connectionId={connectionId}/>
            }




        </div>
    )

}

export default IssueCredential
