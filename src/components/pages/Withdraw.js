import React, { useState } from 'react'
import "../../styles/Deposite.css"
import { db } from '../../Firebase'

function Withdraw() {
    const [account, setaccount] = useState("")
    const [ammount, setammount] = useState("")
    const [name, setname] = useState("")
    const [curramount, setcurramount] = useState("")
    const [message, setmessage] = useState("")


    function withdrawSubmitHandler(e) {
        e.preventDefault()

        db.collection("customers").where("account", "==", parseInt(account)).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {


                    setname(doc.data().name)
                    setcurramount(doc.data().amount)



                })
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }
    function withdrawAmountHandler(e) {
        e.preventDefault()
        db.collection("customers").where("account", "==", parseInt(account)).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (ammount <= doc.data().amount) {
                        db.collection("customers").doc(doc.id).set({
                            name: doc.data().name,
                            email: doc.data().email,
                            account: doc.data().account,
                            number: doc.data().number,
                            amount: parseInt(doc.data().amount) - parseInt(ammount),

                        })

                        console.log("hogyabhai")
                        setname("")
                        setcurramount("")
                        setammount("")
                        setaccount("")
                        setmessage(ammount + " rs Withdrawn from " + doc.data().name + "'s account ")
                    }
                    else {
                        alert("Aukaat k hisab se nikal le ")
                        setammount("")
                    }

                })
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });


    }

    return (
        <div className="deposite-container">
            <h1>EXPRESS WITHDRAW</h1>
            <div className="form-container container">
                <form onSubmit={withdrawSubmitHandler} >
                    <h3>ENTER ACCOUNT NUMBER </h3>

                    <input onChange={(e) => { setaccount(e.target.value) }} value={account} type="text" /><br />
                    <button type="submit" className="btnnx  ">GO</button>
                </form>
            </div>
            <div className="withdraw-container container">
                <span><strong>Name</strong> : {name}</span> <span> , <strong>  Curr bal. </strong>  : {curramount} </span>
                <h2>Enter Withdraw  amount </h2>
                <form onSubmit={withdrawAmountHandler} >
                    <input onChange={(e) => { setammount(e.target.value) }} value={ammount} className="input" type="text" />
                    <button type="submit" className="btnnx  ">GO</button>
                </form>

            </div>
            <div className="depo-message">
                <h1>{message}</h1>
            </div>

        </div>
    )
}

export default Withdraw
