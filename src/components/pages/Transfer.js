import React, { useState } from 'react'
import { db } from '../../Firebase'

function Transfer() {
    const [fromtransfer, setfrom] = useState("")
    const [totransfer, setto] = useState("")
    const [money, setmoney] = useState(null)
    const [message, setmessage] = useState("")





    function setfromhandler(e) {
        setfrom(e.target.value)
    }
    function settohandler(e) {
        setto(e.target.value)
    }
    function setmoneyhandler(e) {
        setmoney(e.target.value)
    }
    function submitHandler(e) {
        e.preventDefault()
        db.collection("customers").where("name", "==", fromtransfer).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (money <= doc.data().amount) {

                        db.collection("customers").doc(doc.id).set({
                            name: doc.data().name,
                            email: doc.data().email,
                            account: doc.data().account,
                            number: doc.data().number,
                            amount: parseInt(doc.data().amount) - parseInt(money),
                        })
                        console.log(doc.id, " => ", doc.data().amount);
                        db.collection("customers").where("name", "==", totransfer).get()
                            .then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {

                                    db.collection("customers").doc(doc.id).set({
                                        name: doc.data().name,
                                        email: doc.data().email,
                                        account: doc.data().account,
                                        number: doc.data().number,
                                        amount: parseInt(doc.data().amount) + parseInt(money),
                                    })
                                    console.log(doc.id, " => ", doc.data().amount);

                                    var today = new Date();
                                    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                                    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                                    db.collection("history").add({
                                        from: fromtransfer,
                                        to: totransfer,
                                        money: money,
                                        time: time,
                                        date: date,

                                    })
                                        .then(() => {
                                            console.log(date, time)


                                        })
                                        .catch(error => {
                                            alert(error.message)
                                        })
                                    setmessage(money + " transfered from " + fromtransfer + " to " + totransfer)





                                });
                            })
                            .catch((error) => {
                                console.log("Error getting documents: ", error);
                            });

                    }
                    else {
                        alert("Amount is too much")
                        setmoney(null)
                        setto("")
                        setfrom("")
                        setmessage("nhi hua ")
                    }

                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        setmoney("")
        setto("")
        setfrom("")

    }




    return (
        <div className="contianer">
            <h1>{message}</h1>
            <form onSubmit={submitHandler}>
                <label>FROM </label>
                <input type="text" value={fromtransfer} onChange={setfromhandler} />
                <label>To </label>
                <input type="text" value={totransfer} onChange={settohandler} />
                <label> ENTER AMOUNT</label>
                <input type="text" value={money} onChange={setmoneyhandler} />
                <br />
                <button type="submit" className="btn button inputfield submit btn-primary">SUBMIT</button>
            </form>

        </div>

    )
}

export default Transfer
