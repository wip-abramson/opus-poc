import React from 'react'
import {instance} from "./api/connections";



const PryConForm = ({setCredOffered, connectionId}) => {

    let [name, setName] = React.useState("")

    let requestPryConCred = () => {
        let path = "/credential/prycon"
        instance.post(path, {
            "name": name,
            "connection_id": connectionId
        }).then(response => {
            setName("")
            setCredOffered(true)
            console.log(response)
        }).catch(error => {
            console.log("Error", error)
        })
    }

   return (
       <div>
           <h2>Thanks for attending PryCon!</h2>
           <h3>Issue yourself a proof of attendance here. Just for fun :)</h3>
           <input placeholder={"name"} value={name} onChange={(e) => setName(e.target.value)}/>
           <button onClick={requestPryConCred}>Request</button>
       </div>
   )
}

export default PryConForm
