import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import "../../styles/Demo.css"
import { db } from '../../Firebase'

const Demo = () => {
    const { transfer } = useParams()

    const fromname = transfer
    const [sender, setsender] = useState(null)
    const [message, setmessage] = useState("")
    const [senderaccount, setsenderaccount] = useState(null)
    const [senderamount, setsenderammount] = useState(null)
    const [toname, settoname] = useState("")
    const [money, setmoney] = useState("")

    useEffect(() => {
        db.collection("customers").where("name", "==", fromname).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {


                    setsender(doc.data().name)
                    setsenderaccount(doc.data().account)
                    setsenderammount(doc.data().amount)


                })
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

    }, null)
    function submithandler(e) {
        e.preventDefault()
        if (toname !== "" && money !== "") {
            db.collection("customers").where("name", "==", fromname).get()
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


                            db.collection("customers").where("name", "==", toname).get()
                                .then((querySnapshot) => {
                                    querySnapshot.forEach((doc) => {
                                        if (toname !== fromname) {
                                            db.collection("customers").doc(doc.id).set({
                                                name: doc.data().name,
                                                email: doc.data().email,
                                                account: doc.data().account,
                                                number: doc.data().number,
                                                amount: parseInt(doc.data().amount) + parseInt(money),
                                            })


                                            var today = new Date();
                                            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                                            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                                            db.collection("history2").add({
                                                from: fromname,
                                                to: toname,
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
                                            setmessage("Money transfered : " + money + " rs from " + fromname + " to " + toname)

                                        }
                                        else{
                                            setmoney(null)
                                            settoname("")
                                            setmessage("RECIEVER IS SAME AS SENDER , TRANSACTION IS FAILED")

                                        }






                                    });
                                }).catch((error) => {
                                    console.log("Error getting documents: ", error);
                                });

                        }
                        else {

                            setmoney('')
                            settoname("")
                            setmessage(" AMOUNT TOO MUCH TRANSACTION FAILED !")
                        }

                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });

            setmoney("")
            settoname("")

        }
        else {
            alert("ALL FIELDS ARE COMPULSORY")
        }


    }
    return (
        <div className="demo-class">
            <h1 className="demo-header">AMBNOX EXPRESS TRANSFER</h1>
            <div className="demo-intro">
                <span id="name">Name :- {sender}</span><br />
                <span id="account">Account :- {senderaccount}</span><br />
                <span id="amount">Amount :- {senderamount}</span><br />
            </div>
            <form className="demo-form" onSubmit={submithandler}>
                <label>Reciever </label><br />
                <input type="text" value={toname} onChange={(e) => {
                    settoname(e.target.value)
                }} /><br />
                <label>Amount </label><br />
                <input type="number" value={money} onChange={(e) => {
                    setmoney(e.target.value)
                }} />
                <br />
                <br />
                <br />
                <button className="btnn btn-success" type="submit" >Submit</button>
            </form>
            <h1 className="demo-message">{message}</h1>
        </div>
    )

}




export default Demo
